import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}
var idiotic = [1]
const useResource = (baseUrl) => {

  const [resources, setResources] = useState([])
  useEffect(()=> {
    axios.get(baseUrl).then(resource => setResources(resource.data))
  },[idiotic])

console.log(resources);
const create = (obj) => {
  const id = resources.length + 2
  console.log({...obj, id});
  axios.post(baseUrl, {id, ...obj}).then(result => setResources(resources.concat(result)))
  console.log("whyyyyy");
  idiotic+= 1;
}

  const service = {
   create: function(objekt){ 
    return create(objekt)
   }
  };
  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    //Servis koji ti treba da napravis
    noteService.create({ content: content.value })
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {/* notes i persons koriste useResource hook */}
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App