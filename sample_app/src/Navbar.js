import React,{useContext,useState} from 'react'
import { Link } from 'react-router-dom'
import { store } from './App'

const Navbar = () => {
  const [token,setToken] = useContext(store)
  return (
    <div>
      { !token &&
      <nav className='navbar navbar-dark bg-dark'>
      <div className='d-inline p-2 navbar-nav mx-auto'>
          <span className='btn btn-success'><Link to='/register' style={{"color":"white"}}>Register</Link></span> &nbsp;
          <span className='btn btn-success'><Link to='/login' style={{"color":"white"}}>Login</Link></span>
      </div>
    </nav>
      }
    </div>
  )
}

export default Navbar
