import React from 'react'
import { Link } from 'react-router-dom'
const Nav = () => {
  return (
    <div>
      <ui>
        <Link to='/register' ><li>Register</li></Link>
        <Link to='/login' ><li>Login</li></Link>
      </ui>
    </div>
  )
}

export default Nav
