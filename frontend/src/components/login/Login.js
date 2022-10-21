import React ,{useState} from 'react'
import './Login.css'
import App from '../../App.js'
import axios from "axios"
import {useHistory} from "react-router-dom"
const Login=(props)=> {


  const history = useHistory()

  const [user,setUser] = useState({
    email :"",
    password :"",
    
  })
  const handleChange= e =>{
   
    const {name,value} = e.target
    setUser({
      ...user,
      [name]:value
    })
  }

  const login = () =>{
    const {email,password} = user
    axios.post("http://localhost:8000/login",user)
    .then((res)=>{
      alert(res.data.message)
      props.setLoginUser(res.data.user)
      console.log(res.data.user)
      history.push("./")
    })
  }

  return (
    <div className='login'>
    {console.log('user',user)}
    <h1>Login</h1>
    <input type="text" name="email" value={user.email} onChange={handleChange} placeholder='Enter your email'></input>
    <input type="password" name="password" value={user.password} onChange={handleChange} placeholder='Enter your password'></input>
    <div className='button' onClick={login}>Login</div>
    <div>or</div>
    <div className='button' onClick={()=>history.push("/register")}>Register</div>
    
    
    </div>
  )
}

export default Login