const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')

app.use(morgan('tiny'))
app.use(express.json())
app.use(express.static('build'))
app.use(cors())


const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(requestLogger)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'ValidationError') {    return response.status(400).json({ error: error.message })  }

  
  next(error)
}
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}


morgan.token('pLog', function(req,res) {
  return JSON.stringify(req.body);
})
app.use(morgan(':pLog'))
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
  Person.find({}).then(notes => {
    response.json(notes)
})})
// unimplement backend
app.get('/info', (request, response)=>{
   const maxId = notes.length > 0
  ? notes.length 
  : 0
  response.send(`Phonebook has info for ${maxId} people ${new Date()}`)
})

app.get('/', (request, response) => { // event handeler for get http request inside apps root
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons/:id', (request, response,next) => {
  Person.findById(request.params.id)
  .then(result => {
    response.json(result)
  })
  .catch(error => next(error))
})
  /* const id = Number(request.params.id)
   const note = notes.find(note => note.id === id)
  if(note)
  {
  response.json(note)
  }
  else {
  response.status(403).end(); }
}) */

app.delete('/api/persons/:id', (request,response, next) => {
  Person.findByIdAndRemove(request.params.id)
  .then(result => { response.status(204).end()})
  .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) =>
{
  const person = request.body
   /* const maxId = notes.length > 0 //notes.length is stuck at 4
  ? Math.max(...notes.map(n => n.id)) 
  : 0
  person.id = maxId+1*/
  //const dummy = notes.find(noteses => noteses.name === person.name)

  const note = new Person({
    name: person.name,
    number: person.number,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
  .catch(error => next(error))

 /* if(person.name && person.number)
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
  }*/
})
app.put('/api/persons/:id', (request, response, next) => {
  const person = request.body

  const note = new Person ({
    name: person.name,
    number: person.number,
    //id: person.id
  })
 // Person.find({name: note.name}).then(found => )
console.log(note);
  Person.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})
app.use(unknownEndpoint)

app.use(errorHandler)


let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});

