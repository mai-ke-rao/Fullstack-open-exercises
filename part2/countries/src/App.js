import { useEffect, useState } from "react";
 import axios from "axios";
 import './index.css'
 const api_key = process.env.REACT_APP_API_KEY
 const Languages = ({lingva}) =>
 {  const niz = [];
  for(const prototype in lingva)
  { niz.push(lingva[prototype])}
  return(niz.map(elem => <li key={elem}>{elem}</li>))
 }
 const Show = ({results, pay}) => {
  const[toggle, setToggle] = useState(false)
  if(!toggle){
  return( <button key={pay} onClick={()=> setToggle(true)}>Show</button>
  )}
  if(toggle){
    return(    
      <div>
      <h2> {results.name.common}</h2>
      <p>
      capital: {results.capital[0]}
      <br></br>
      area: {String(results.area)}
      </p>
      <b><i>Languages:</i></b>
     <ul>
        <Languages lingva={results.languages}/>
      </ul>
    {/* I am unable to enlarge flag, Mark Zuck did this deliberately */}
      <div className="zastava">
       {results.flag}
       </div>
     </div>
 )
  }
 }
 
  let podaci = {
    temp : 0,
    wind : 0,
    icon : ""
  };
 function x (podaci, results)  {
  axios
  .get(`http://api.openweathermap.org/geo/1.0/direct?q=${results[0].capital[0]},${results[0].name.common}&appid=${api_key}`)
  .then(response => 
   { var lat =  response.data[0].lat;
    var lon = response.data[0].lon; 
    axios 
 .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
   .then(response => 
    { 
      var hourly = response.data;
       podaci.temp = response.data.main.temp
       podaci.wind = response.data.wind.speed
       console.log(podaci.temp);
       podaci.icon = hourly.weather[0].icon
    
    
  }) 
})

}
const Countries = ({response, search}) =>
{   
 
    let tempo = response;
    let results = tempo.filter(temp => temp.name.common.substring(0, search.length) == search)
    

   
   if (results.length > 10)
   { 
    return ( <p> try being more specific</p>)
   }
   else if(results.length >1)
   {
    return(
      results.map(results => 
      <div key={results.name.common}> {results.name.common} <Show results={results}pay={results.name.common}></Show></div>
        ) )
   }
   else if(results.length == 1)
   {  
  
    x(podaci, results);
    // on iz nekog razloga ide dalje ne ceka return iz funkcije
    console.log(podaci, podaci.temp);
    
    return( 
      <div>
        <h2> {results[0].name.common}</h2>
        <p>
        capital: {results[0].capital[0]}
        <br></br>
        area: {String(results[0].area)}
        </p>
        <b><i>Languages:</i></b>
       <ul>
          <Languages lingva={results[0].languages}/>
        </ul>
      {/* I am unable to enlarge flag, Mark Zuck did this deliberately */}
        <div className="zastava">
         {results[0].flag}
         </div>
        
       <div>
       
    
       <p>Temperature: {podaci.temp}
       </p>
       <p>
       <img src={`http://openweathermap.org/img/wn/${podaci.icon}@2x.png`}></img>
       </p>
       <p>
       Wind:{podaci.wind}</p>
       
      
        
 
  
        {/* <Weather results={results}></Weather> */}
         </div>
         </div>
     
   
   
        
        )
     
    }
}
//const Weather () => {}
function App({podaci}) {
  
  const [search, setSearch] = useState('');
 const [rezultati, setRezultati] = useState([]);

function searchCountry(e)
{ e.preventDefault();
   setSearch(e.target.value);
  
}
useEffect(() => {
  console.log(search);
  if (search) {
    console.log('fetching countries... with query',search)
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then(response => {
       setRezultati(response.data)
      
          
      })
      .catch(error => console.log(error));
  }
},[search]) //  apperently this has to be array 
  return (
    <div >
       find country: <input type='search' name="q" onChange={searchCountry} value={search} />
      <div>  
      
        <Countries response ={rezultati} search={search} podaci={podaci} /></div>
        </div>
  );
}

export default App;
