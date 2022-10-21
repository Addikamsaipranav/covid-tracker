import React from 'react'
import "./components/Newsletter.css"
function Newsletter() {
    const clciked=(e)=>{
        alert("Thanks for subscribing")
    }
  return (
    <div className='janu'>
      
    <div className='register'>
    
    <h1>Newsletter</h1>
   
    <input type="text" name="email"   placeholder='Enter your email' ></input>
    
    <div className='button' onClick={clciked} >Submit</div>
   
    
    </div>
    </div>
  )
}

export default Newsletter