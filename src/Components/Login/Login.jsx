import React, { useState } from 'react'
import BASE_URL from '../../service/BaseAddress'

const Login = () => {

  const [loggedIn, setLoggedIn] = useState(false);

    const [formData,setFormData] = useState({
        userId:"",
        password:""
      })
    
      const changeHandler = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
      }
    
      const fetchAdmin = async ()=>{
        console.log("pressed");
        let responseData;
        await fetch(`${BASE_URL}/fetchadmin`,{
          method:'POST',
          headers:{
            Accept:'application/form-data',
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(formData)
        }).then((resp)=>resp.json()).then((data)=>responseData=data)
        if(responseData.success){
          localStorage.setItem('auth-token',responseData.token);
          setLoggedIn(true);
        }
        else{
          alert(responseData.errors);
        }
    }    
    if(loggedIn){
      window.location.replace('/');
    }
  return (
    <div className='Login-container'>
     <div className='login'>
        <h1>Login</h1>
        <input className='text-input'  type='text' name='userId' value={formData.userId}  onChange={changeHandler} placeholder='User ID' required/>
        <input className='text-input' name='password' value={formData.password} type='password'  onChange={changeHandler} placeholder='Password' required/>
        <button onClick={fetchAdmin}>Continue</button>
     </div>
    </div>
  )
}

export default Login
