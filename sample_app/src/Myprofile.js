import React,{useContext,useState,useEffect} from 'react';
import axios from 'axios';
import { store } from './App';
import { Navigate } from 'react-router-dom';

const Myprofile = () => {
  const [token,setToken] = useContext(store);
  const [data,setData] = useState(null);
  useEffect(() => {
    
      axios.get('http://localhost:5000/myprofile',{
      headers:{
        'x-token':token
        }
      }).then(res => setData(res.data)).catch((err) => console.log(err))
    })

  if(!token){
    return <Navigate to='/login' />
  }
  return (
    <div>
      {
        data &&
      <center>
        Welcome user : {data.username}<br/>
        <button onClick={()=>setToken(null)}>Logout</button>
      </center>
      }
    </div>
  )
}

export default Myprofile
