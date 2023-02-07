import { useState, useEffect} from 'react'
import  axios from 'axios'
import {Filter} from './Filter'
import personalService from './services/persons'
//import {Button01} from './Button01'
const App = () => {
 
 const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('') //trentni tekst u formi
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setSearch] = useState('')
 // const [toggle, setToggle] = useState(true)
   var toggle = true;
  // dodavanje elementa na listu
  const hook = () => {
    personalService
    .getAll()
    .then(resposne => {
      setPersons(resposne)
      console.log('I did');
    })
  }
  useEffect(hook,[]);


  const dodaj = (event) =>{
 event.preventDefault();
   const personel = {
    name: newName,
    number: newNumber
   }
   for(let i =0;i<persons.length;i++)
   {
   
   if(JSON.stringify(personel.name) === JSON.stringify(persons[i].name))
  { 
    alert(`${personel.name} Username has been taken`);
    return
       }
      }
      personalService
      .create(personel)
      .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
   // setPersons(persons.concat(personel))
    setNewName(" Mr. ")
   
    }
  // kraj dodavnja

  
  const handleNoteChange = (event) => {
   // console.log(event.target.value);
     setNewName(event.target.value);
  }
  const handleNumChange = (event) =>{
  //  console.log(event.target.value);
    setNewNumber(event.target.value);
  }


  const searchName = (event) =>{
  setSearch(event.target.value)
  }
  const remover = (ide) =>
  {   let temp = (persons.filter(x => x.id === ide))
   console.log(temp);
    if(window.confirm(`Do you really want to delete  ${temp[0].name}?`))
  { 
     personalService
       .remove(ide)
       .then(returned => console.log(returned))
       setPersons(persons.filter(x => x.id !== ide))
  }
  else return
  }
  
  return (
    <div>
    <h2> Phonebook</h2>
    <div> 
    
   Search name: <input type='search' name='q' onChange={searchName}/> {/* <Button01 toggle={toggle} func={setToggle}></Button01>*/}</div>
   <div><Filter persons={persons} newSearch={newSearch} toggle={toggle}></Filter></div>
      <h2>Add new</h2>
      <div>
      <form onSubmit={dodaj}>
        
         <div> name: <input value={newName} onChange={handleNoteChange}/> </div>
          <div>number: <input value={newNumber} onChange={handleNumChange}/></div>
        

          <button type="submit">add</button> 
      
      </form></div>
      <h2>Numbers</h2>
      ...<div>debug: {newSearch} </div>
         <ol>{/* we would like this in same if statement*/ }
          {persons.map(person => <li key={person.name}>{person.name} {person.number} <button onClick={()=>remover(person.id)}>Delete</button></li>)}
         </ol>
    </div>
  )
}

export default App