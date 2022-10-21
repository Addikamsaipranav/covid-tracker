import React from "react";
import Card   from './components/Card'
const CovidSummary =(props)=>{

    return(
    
         <div>
          
        <h1>World wide corona report</h1>
        <div style={{
            display:'flex',
            justifyContent:'center'
        }}>
        <Card/>
        <Card/>
        <Card/>

         </div>
         </div>

    )
}