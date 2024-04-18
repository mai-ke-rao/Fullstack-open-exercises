import { useState, useEffect} from 'react'
import  axios from 'axios'
import {Filter} from './components/Filter'
import personalService from './services/persons'
import Notification from './components/Notification'
//import {Button01} from './Button01'

const Info = ({toggl, basicInfo}) => {
  //console.log(response);
  var debil = JSON.stringify(new Date());
  if(toggl){
return(<>Phonebook has info for {basicInfo.info} people {debil}</>)
  }
}

function eventHandler (setToggl, toggl){
    setToggl(!toggl)
}

const App = ({basicInfo}) => {
 

 const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('') //trentni tekst u formi
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
 const [toggl, setToggl] = useState(false)
   var toggle = true;
   personalService
   .info()
   .then(response => {basicInfo.info=response.length})
  // dodavanje elementa na listu
  console.log(basicInfo.info);
  const hook = () => {
    personalService
    .getAll()
    .then(resposne => {
      setPersons(resposne)
      console.log('I did');
    })
  }
  useEffect(hook,[]);
  console.log("ljudovi: ");
  console.log(persons);

  const dodaj = (event) =>{
 event.preventDefault();
   const personel = {
    name: newName,
    number: newNumber
   }
   
   for(let i =0;i<persons.length;i++)
   {
   
   if(personel.name === persons[i].name)
  {   // ovde cemo sada da aktiviramo put request
    // Moram da posaljem request sa IDom da li da prvo requestujem id ili 
     // id bi vrv trebao da skladistis u vidu state varijable
     window.confirm(`${personel.name} already exist, do you want to alter the ${personel.name}'s info?`)
     personalService
      .update(persons[i].id, personel)
      .then(returnedPerson => {   //I do no get returned person, which leads to unknown error
        let temp = persons  
        temp[i].number = personel.number
        setPersons(temp)
        setErrorMessage(`${returnedPerson.name} number has been succesfuly altered`)
        setTimeout(() => {
         setErrorMessage(null)
         
       }, 5000)
      }).catch(error => {
        // this is the way to access the error message. 
       setErrorMessage(error.response.data.error)
      })
    /*alert(`${personel.name} Username has been taken`);
    return*/
    return
       }
      }
      personalService
      .create(personel)
      .then(returnedPerson => {setPersons(persons.concat(returnedPerson))
       setErrorMessage(`${returnedPerson.name} has been succecfully added`)
       setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      }).catch(error => {
        // this is the way to access the error message. 
       setErrorMessage(error.response.data.error)
      })
       
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
      <Notification message={errorMessage} />
      <h2>Numbers</h2>
      <p>
     <Info toggl={toggl} basicInfo={basicInfo}></Info> 
     </p>
     <button onClick={() => eventHandler(setToggl, toggl)}>data info</button>
      {/*...<div>debug: {newSearch} </div>*/}
         <ol>{/* we would like this in same if statement*/ }
          {persons.map(person => <li key={person.name}>{person.name} {person.number} <button onClick={()=>remover(person.id)}>Delete</button></li>)}
         </ol>
    </div>
  )
}

export default App