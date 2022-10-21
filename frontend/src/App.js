import React,{ useState, useEffect } from 'react'

import Home from './components/Home'
import Register from './components/Register/Register'
import Login from './components/login/Login'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
const App = () => {

  const [user,setLoginUser] =useState({});

 

  return (
    <div className='App'>
       
    <Router>
       <Switch>
           <Route exact path='/'>
          {
            user && user._id
            ?
            <Home/>
            :
            <Login/>
          }
         </Route>

          <Route path='/login'>
          <Login setLoginUser={setLoginUser}/></Route>
          <Route path='/register'><Register/></Route>
       </Switch>
    </Router>
        
        
    </div>
  )
}

export default App
