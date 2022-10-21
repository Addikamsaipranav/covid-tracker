import React,{ useState, useEffect } from 'react'
import Card   from './Card'
import LineChart from './LineChart'
import './App.css'
import axios from './axios'
import Newsletter from '../Newsletter'
import Marquee from "react-fast-marquee";


const Home = () => {

 
  const [totalConfirmed,setTotalConfirmed] =useState(0);
  const [totalRecovered,setTotalRecovered]=useState(0);
  const [totalDeaths,setTotalDeaths] = useState(0);
  const [newConfirmed,setnewConfirmed]=useState(0);
  const [loading,setLoading]=useState(false);
  const [covidSummary,setCovidSummary]=useState({});
  const [days,setDays]=useState(7);
  const [country,setCountry]=useState('');
  const [coronaCountAr,setCoronaCountAr]=useState([]);
  const [label,setLabel] = useState([]);

  //componentDidmount
  useEffect(()=>{
    setLoading(true)
    axios.get(`/summary`)
    .then(res=>{
      setLoading(false)

       if(res.status === 200){
        setTotalConfirmed(res.data.Global.TotalConfirmed);
        setTotalRecovered(res.data.Global.TotalRecovered);
        setTotalDeaths(res.data.Global.TotalDeaths);
        setnewConfirmed(res.data.Global.NewConfirmed);
        setCovidSummary(res.data);
       }

     
      console.log(res)


    })
    .catch(error=>{
       console.log(error)
    })
      
  
     
  },[]);
  const formatDate =(date)=>{

    const d=new Date(date);
    //2020-05-04;
    const year = d.getFullYear();
    const month = `0${d.getMonth() +1}`.slice(-2);
    const _date= d.getDate();
    return `${year}-${month}-${_date}`;
  
  
  
   }

  const countryHandler = (e)=>{
    setCountry(e.target.value);
    const d = new Date();
    const to = formatDate(d);
    const from =formatDate(d.setDate(d.getDate()-days)) ;

    console.log(from,to);
    getCoronaReportByDateRange(e.target.value,from,to)

  }

 

  const daysHandler=(e)=>{
    setDays(e.target.value);

    const d = new Date();
    const to = formatDate(d);
    const from =formatDate(d.setDate(d.getDate()-e.target.value)) ;

    getCoronaReportByDateRange(country,from,to);
  }

  const getCoronaReportByDateRange=(countrySlug,from,to)=>{
    axios.get(`/country/${countrySlug}/status/confirmed?from=${from}T00:00:00Z&to=${to}T00:00:00Z`)
    .then(res=>{
      console.log(res);
      const yAxisCoronaCount = res.data.map(d => d.Cases);
      const xAxislabel = res.data.map(d=>d.Date);
      const covidDetails = covidSummary.Countries.find(country => country.Slug === countrySlug);
      setCoronaCountAr(yAxisCoronaCount);
      setTotalConfirmed(covidDetails.TotalConfirmed);
      setTotalRecovered(covidDetails.TotalRecovered);
      setTotalDeaths(covidDetails.TotalDeaths);
      setnewConfirmed(covidDetails.NewConfirmed);
      setLabel(xAxislabel);
    })
    .catch(error=>{
      console.log(error);
    })
  }

  if(loading){
    return <p>Fetching data from server ...!</p>
  }

  return (
    <div className='App'>
    
    <Marquee style={{backgroundcolor:"black"}}>
    <span style={{color:"red"}}>COVID-19 IS NOT OVER HERE "WEAR A MASK KEEP MAINTING DISTANCE " BE SAFE AND KEEP OTHERS SAFE</span>
  </Marquee>
          
           <div>
               <Card
                  totalConfirmed ={totalConfirmed}
                  totalRecovered={totalRecovered}
                  totalDeaths={totalDeaths}
                  newConfirmed={newConfirmed}
                  country={country}
               ></Card>

               <select value={country} onChange={countryHandler}>
                   <option value="">Select country </option>
                      {
                        covidSummary.Countries && covidSummary.Countries.map(country=>
                          <option key={country.Slug} value={country.Slug}>{country.Country}</option>)
                      }
               </select>
               <select value={days} onChange={daysHandler}>
                  <option value="7">Last 7 days</option>
                  <option value="30">Last 30 days</option>
                  <option value="90">Last 90 days</option>
               </select>
               
             </div>
         
       
    


   <div>
      <LineChart
        yaxis={coronaCountAr}
        label={label}
      />
      
     </div> 
     <Newsletter></Newsletter>
     
     <div className='contact'><span style={{color : "black"}}>PLEASE CONTACT ADMIN FOR FURTHER QUERIES</span></div>
      
    </div>
  
  )
}

export default Home
