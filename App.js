

import { useState } from 'react'
const Display = ({ tekst }) => <div>{tekst}</div>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Statistics = ({ counter, tekst }) => {
  if(counter === 0)
  return(<><td>Ovde nema nicega</td></>)
return(<><td>{tekst} </td><td> {counter}</td></>)}
  


const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0);
  const [Ppercentage, setPpercentage] = useState(0);
  const [avarage, setAvarage]= useState(0);
  const handlerG = () => {
    setTotal(total +1)
    setGood(good+1)
    setPpercentage(good/total *100)
    setAvarage(avarage+1)
  }
  const handlerN =() =>{
    setTotal(total +1);
     setNeutral(neutral+1)
     setPpercentage(good/total *100)
}
    const handlerB = () => {
      setTotal(total +1);
     setBad(bad+1);
    setPpercentage(good/total *100);
     setAvarage(avarage-1)
  }
  return (
    <div>
      <h2> Give feedback</h2>
      <Button onClick = {handlerG}text ={"good"}></Button>
      <Button onClick = {handlerB}text ={"bad"}></Button>
      <Button onClick = {handlerN}text ={"neutral"}></Button>
   
      <h3>Statistics</h3>
      <table>
     <tr>
    <Statistics counter={good} tekst={"good"} ></Statistics></tr>
        <tr>
      <Statistics counter={bad} tekst={"bad"} ></Statistics>
        </tr><tr>
      <Statistics counter={neutral} tekst={"neutral"} ></Statistics></tr><tr>
      <Statistics counter={total} tekst={"Total: "} ></Statistics></tr><tr>
      <Statistics counter={avarage} tekst={"Avarage: "} ></Statistics></tr><tr>
      <Statistics counter={Ppercentage} tekst={"Precetage of positive: "} ></Statistics></tr>
         </table>
    </div>
  )
}


export default App;
