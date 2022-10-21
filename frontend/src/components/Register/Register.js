import React, { useState } from 'react'
import './Register.css'
import axios from "axios"
import {useHistory}  from "react-router-dom"
function Register() {

  const history = useHistory()
  const [user,setUser] = useState({
    name :"",
    email :"",
    password :"",
    reEnterpassword:""
  })
  const handleChange= e =>{
   
    const {name,value} = e.target
    setUser({
      ...user,
      [name]:value
    })
  }

  const register = ()=>{
    const {name,email,password,reEnterpassword} = user
    if(name && email && password && (password === reEnterpassword)){
      alert("posted")
      axios.post("http://localhost:8000/register",user)
      .then(res=> alert(res.data.message))
      history.push("/login")
    }
    else{
      alert("invalid input")
    }
    
  }

  return (
    <div className='register'>
    {console.log("user",user)}
    <h1>Register</h1>
    <input type="text" name = "name" value={user.name} placeholder='Enter your name' onChange={handleChange} ></input>
    <input type="text" name="email" value={user.email} placeholder='Enter your email' onChange={handleChange}></input>
    <input type="password" name="password" value={user.password} placeholder='Your password' onChange={handleChange}></input>
    <input type="password" name="reEnterpassword" value={user.reEnterpassword} placeholder='re-enter password'onChange={handleChange}></input>
    <div className='button' onClick={register}>Register</div>
    <div>or</div>
    <div className='button' onClick={()=>history.push("/login")}>Login</div>
    
   
    
    
    </div>
  )
}

export default Register