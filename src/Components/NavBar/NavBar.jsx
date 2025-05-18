import React, { useEffect, useState } from 'react'
import logo_icon from "../../Assets/logo.png";
import './NavBar.css'
import { Link, Navigate } from 'react-router-dom';

const NavBar = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(()=>{
    localStorage.getItem('auth-token')?setLoggedIn(true):setLoggedIn(false);
  },[])

  return (
    <div className="Navbar">
      <div className="logo">
        <img src={logo_icon} alt="" />
        <Link to="/"><p>SHOPPER <span>ADMIN</span></p> </Link> 
      </div>
      <div className="cart-login">
        {/* {localStorage.getItem('auth-token')&&<button className="Login-signup" onClick={()=>{localStorage.removeItem('auth-token');window.location.replace("/")}}>Logout</button>} */}
        {loggedIn?<button onClick={()=>{localStorage.removeItem('auth-token'); window.location.replace('/');}} className="Login-signup">Logout</button>:<Link to='/login' ><button className='Login-signup'>Login</button></Link>}
    </div>
    
    </div>
  )
}

export default NavBar
