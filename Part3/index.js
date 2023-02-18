const express = require('express')
const app = express()
var morgan = require('morgan')
app.use(morgan('tiny'))
app.use(express.json())
let notes = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]
app.get('/api/persons', (request, response) => {
  response.send(notes)
})

app.get('/info', (request, response)=>{
   const maxId = notes.length > 0
  ? Math.max(...notes.map(n => n.id)) 
  : 0
  response.send(`<h1>Phonebook has info for ${maxId} people</h1> ${new Date()}`)
})

app.get('/', (request, response) => { // event handeler for get http request inside apps root
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons/:id', (request, response) => {
   const id = Number(request.params.id)
   const note = notes.find(note => note.id === id)
  if(note)
  {
  response.json(note)
  }
  else {
  response.status(403).end(); }
})

app.delete('/api/persons/:id', (request,response) => {
  const id = Number(request.params.id)
  const personel = notes.filter(note => note.id !== id)
  response.status(204).end();
})
app.post('/api/persons', (request, response) =>
{
  const person = request.body
  const maxId = notes.length > 0
  ? Math.max(...notes.map(n => n.id)) 
  : 0
  person.id = maxId+1
  const dummy = notes.find(note => note.name === person.name)
  notes = notes.concat(person)
  

  if(person.name && person.number)
  {
    if(dummy){
      response.status(403).json({ error: 'name must be unique'})
    }
   else{
    response.json(person)
   }
  }
  else if(person.name){
    response.status(403).json({error: 'missing number'})
  }
  else if(person.number)
  {
    response.status(403).json({error: 'missing name'})
  }
  else {
    response.status(403).json({error: 'missing name and number'})
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}) 