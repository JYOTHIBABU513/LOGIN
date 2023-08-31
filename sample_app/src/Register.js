import React,{useState} from 'react'
import axios from 'axios';

const Register = () => {
    
    const [data,setData] = useState({
        username:'',
        email:'',
        password:'',
        confirmpassword:''
    })
    const changeHandler = e => {
        setData({...data,[e.target.name]:e.target.value})
    }
    const submitHandler = e =>{
        e.preventDefault();
        try{
            axios.post('http://localhost:5000/register',data).then(
            res => alert(JSON.stringify(res.data)))
        }catch(err){
        console.log(err)
        }
    }

  return (
    <div>
        <center>
            <form onSubmit={submitHandler} >
                <h3>Register</h3>
                <input style={{"margin":"3px"}} type="text" onChange={changeHandler} name="username" placeholder='User Name' /><br/>
                <input style={{"margin":"3px"}} type="email" onChange={changeHandler} name="email" placeholder='Email' /><br/>
                <input style={{"margin":"3px"}} type="password" onChange={changeHandler} name="password" placeholder='Password' /><br/>
                <input style={{"margin":"3px"}} type="password" onChange={changeHandler} name="confirmpassword" placeholder='Confirm Password' /><br/>
                <input style={{"margin":"3px"}} type="submit" value="Register" /><br/>
            </form>
        </center>
    </div>
  )
}

export default Register
