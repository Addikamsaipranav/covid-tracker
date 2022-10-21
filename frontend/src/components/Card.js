import React from "react";
import NumberFormat from "react-number-format";


const Card = (props)=>{

     const {
        totalConfirmed,
        totalRecovered,
        totalDeaths,
        newConfirmed,
        country,
     } = props;

    
    return(
    
        <div className="card">
        <h1 style={{textTransform:'capitalize'}}>{country ==='' ? 'World wide corona report' : country}</h1>
           {props.children  }
           <div class="flex-container">
          <div>
          <span>Toatl confirmed</span><br/>
          <span>
          {
              <NumberFormat
            value={totalConfirmed} 
            displayType={'text'}
            thousandSeparator={true}
            ></NumberFormat>
        }
        </span>
          </div>
          <div>
          <span>Newly Confirmed</span><br/>
          <span>
          
          {
            <NumberFormat
          value={newConfirmed} 
          displayType={'text'}
          thousandSeparator={true}
          ></NumberFormat>
      }</span>
          </div> 
          <div className="recovered">
          
          <span>Toatl Recovered</span><br/>
          <span>
          {
            <NumberFormat
          value={totalRecovered}
          displayType={'text'}
          thousandSeparator={true}
          ></NumberFormat>
      }
          </span>
          </div>
          <div>
          <span>Toatl deaths</span><br/>
          <span>
          {
            <NumberFormat
          value={totalDeaths} 
          displayType={'text'}
          thousandSeparator={true}
          ></NumberFormat>
      }
          </span>
          </div> 
         
       </div>
        </div> 
     
    )
}

export default Card