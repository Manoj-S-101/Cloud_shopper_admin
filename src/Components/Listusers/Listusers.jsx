import React, { useEffect, useState } from 'react'
import './Listusers.css'
import BASE_URL from '../../service/BaseAddress';
import cross_icon from '../../Assets/cart_cross_icon.png'
import { toast } from 'react-toastify';

const Listusers = () => {
  const [allUsers,setAllUsers] = useState([]);

  const fetchuserinfo = async()=>{
    fetch(`${BASE_URL}/allusers`).then((resp)=>resp.json()).then((data)=>setAllUsers(data));
  }
  useEffect(()=>{
    fetchuserinfo();
  },[])

  const remove_user = async(email)=>{
    let responsedata = await fetch(`${BASE_URL}/remouser`,{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({email:email})
    })

    let data = await responsedata.json();
    if(data.success){
     toast.success(`User with email id: ${email} deleted`);
    }
    else{
      toast.error("Failed in deleting ");
    }
    fetchuserinfo();
  }

  return (
    <div className='listusers'>
      <div className="topic-details">
        <p className="username">Username</p>
        <p className="email">Email</p>
        <p className="password">Password</p>
        <p className="date">Date</p>
        <p className="remove-user">Remove</p>
      </div>
      <hr/>
      <div className="display-users">
        {
            allUsers.map((e)=>{
                   return(
                    <React.Fragment key={e.id}>
                    <div className="in-small">{e.email}</div>
                    <div className='display-users-inside-one' key={e.id} >
                    <div className="username">{e.name}</div>
                    <div className="email">{e.email}</div>
                    <div className="password">{e.password}</div>
                    <div className="date">
                    {(() => {
                  let dateOnly = new Date(e.date).toISOString().split('T')[0];
                  let timeOnly = new Date(e.date).toTimeString().split(' ')[0];
                  return <span>{dateOnly + ' ' + timeOnly}</span>;
                })()}
                    </div>
                    <div className="remove-user" ><img src={cross_icon} alt="" onClick={()=>remove_user(e.email)}/></div>
                    </div>
                    <hr/>
                    </React.Fragment>
                   )
            })
        }
      </div>
    </div>
  )
}

export default Listusers
