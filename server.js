const express = require('express');
const mongoose = require('mongoose');
const Registeruser = require('./model');
const jwt = require('jsonwebtoken');
const middleware = require('./middleware');
const cors = require('cors');
const Msgmodel = require('./Msgmodel');

const app = express();

mongoose.connect('mongodb+srv://lucky:lucky@cluster0.f3rcnou.mongodb.net/?retryWrites=true&w=majority').then(
    () => console.log('DB Connected...!!!')   
)

app.use(express.json());

app.use(cors({origin:"*"}))

app.post('/register', async (req,res) => {
    let response;
    let statusCode;
    try{
        const {username,email,password,confirmpassword} = req.body;

        const data = {
            username:username,
            email:email,
            password:password,
            confirmpassword:confirmpassword
        }

        if(password !== confirmpassword){
            statusCode=400;
            response="Passwords are not matching";
            return res.status(statusCode).send(response);
        }
        // email validation
        // username - length, alphanumeric, etc - validation
        let exist = await Registeruser.findOne({email})
        if(exist){
            statusCode=400;
            response="User Already Exist";
            
        }else{
            let newUser = new Registeruser({
                username,
                email,
                password,
                confirmpassword
            })
            await newUser.save();
            statusCode= 200;
            response="Registered successfully...";
            
        }
    }
    catch(err){
        console.log(err)
        statusCode=400;
        response="Internal server Error";
    }
    
    return res.status(statusCode).send(response)
})
app.post('/login', async (req,res) => {
    try{
        const {email,password} = req.body;
        let exist = await Registeruser.findOne({email});
        if(!exist){
            return res.status(400).send('User Not Found');
        }
        if(exist.password !== password){
            return res.status(400).send('Invalid credentials');
        }
        //res.send('User Logged In...')
        let payload = {
            user:{
                id: exist.id
            }
        }
        jwt.sign(payload,'jwtsecret',{expiresIn:3600000},
            (err,token) => {
                if(err) throw err;
                return res.json(token)
            })
    }
    catch(err){
        console.log(err);
        return res.status(500).send('server Error')
    }
})

app.get('/myprofile',middleware,async(req,res) => {
    try{
        let exist = await Registeruser.findById(req.user.id)
        if(!exist){
            return res.status(400).send('User not found');
        }
        res.json(exist)

    }
    catch(err){
        console.log(err);
        return res.status(500).send('Invalid Token')
    }
})

app.post('/addmsg',middleware,async(req,res) => {
    try{
        const {text} = req.body;
        const exist = await Registeruser.findById(req.user.id);
        let newmsg = new Msgmodel({
            user: req.user.id,
            username : exist.username,
            text
        })
        await newmsg.save();
        let allmsg = await Msgmodel.find();
        return res.json(allmsg)
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
})

app.get('/getmsg',middleware,async(req,res) => {
    try{
        let allmsg = await Msgmodel.find();
        return res.json(allmsg)
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
})

app.listen(5000,()=> {
    console.log('server running...')
})