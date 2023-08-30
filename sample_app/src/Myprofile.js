import React,{useContext,useState,useEffect} from 'react';
import axios from 'axios';
import { store } from './App';
import { Navigate } from 'react-router-dom';
import Moment from 'react-moment'
//import { text } from 'express';

const Myprofile = () => {
  const [token,setToken] = useContext(store);
  const [data,setData] = useState(null);
  const [allmsg,setAllmsg] = useState([]);
  const [newmsg,setNewmsg] = useState([]);
  useEffect(() => {
      axios.get('http://localhost:5000/myprofile',{
      headers:{
        'x-token':token
        }
      }).then(res => setData(res.data)).catch((err) => console.log(err))
    },[])

    const submitHandler = e => {
      e.preventDefault();
      axios.post('http://localhost:5000/addmsg',{text:newmsg},{
      headers:{
        'x-token':token
        }
      }).then(res => setAllmsg(res.data)).catch((err) => console.log(err))
    }
    axios.get('http://localhost:5000/getmsg',{
      headers:{
        'x-token':token
        }
      }).then(res => setAllmsg(res.data)).catch((err) => console.log(err))

  if(!token){
    return <Navigate to='/login' />
  }
  return (
    <div>
      {
        data &&
      <center>
        <br />
        <div class="card" style={{"width":"38rem","textAlign":"left"}}>
          <div class="card-body">
            {
              allmsg.length>=1 ?
                allmsg.map(message => <div class="card">
                <div class="card-body"> 
                  <h5 class="card-title">{message.username} <Moment style={{"fontSize":"11px"}}format='hh:mm:ss'>{message.date}</Moment></h5>
                  <p>{message.text}</p>
                </div>
              </div>)
              :
              <h1>Message Loading</h1>
            }
            <form onSubmit={submitHandler}>
              <input type="text" onChange={e => setNewmsg(e.target.value)}/>
              <input type="submit" value="Send Message" />
            </form>
            <hr />
            <button class="btn btn-primary" onClick={()=>setToken(null)}>Logout</button>
          </div>
        </div>
        
      </center>
      }
    </div>
  )
}

export default Myprofile
