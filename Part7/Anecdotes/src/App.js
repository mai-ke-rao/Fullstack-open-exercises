import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch
} from "react-router-dom"
import  { useField } from './hooks'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (<div>
    <Link style={padding} to='/'>Anecdotes</Link>
    <Link style={padding} to='/create'>Create new</Link>
    <Link style={padding} to='/about'>About</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes, notification }) => (
  <div>
    <h2>Anecdotes</h2>
    {notification}
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} ><Link to={`/anecdote/${anecdote.id}`}>{anecdote.content}</Link></li>)}
    </ul>
  </div>
)
/*
const AnecdoteView = ({anecdote}) => (
  <div>
   <em> "{anecdote.content}" </em>by {anecdote.author}
   <p>
has: {anecdote.votes} votes
</p>
  </div>
)*/
const AnecdoteDisplay = ({anecdotes}) =>{
  const id = useParams().id
  console.log(anecdotes);
  console.log('id is :',Number(id));
  const anecdote = anecdotes.find(a => a.id === Number(id))
   
  
  return(
    <div>
   <em> "{anecdote.content}" </em>by {anecdote.author}
   <p>
has: {anecdote.votes} votes
</p>
  </div>
  )


}
const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)
//HERE
const CreateNew = (props) => {
  //const [content, setContent] = useState('')
 // const [author, setAuthor] = useState('')
  //const [info, setInfo] = useState('')
const naziv = useField('content')
const autor = useField('author')
const info = useField('info')
  const handleSubmit = (e) => {
    //var content = naziv.value
    console.log('autor: ',autor.value);
    e.preventDefault()
    props.addNew({
      content: naziv.value,
      author: autor.value,
      info: info.value,
      votes: 0
    })
  }
 
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit} id='myform'>
        <div>
          content
          <input {...naziv} />
        </div>
        <div>
          author
          <input {...autor} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type='submit'>create</button><button type='reset' onClick={()=>{naziv.onReset(); autor.onReset(); info.onReset();}}>reset</button>
      </form>
    </div>
  )

}

const App = () => {
 
  
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  
  const [notification, setNotification] = useState('')
const navigate = useNavigate()
  const addNew = (anecdote) => {
    
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    navigate('/')
    setNotification(`anecdote "${anecdote.content}" added`)
    setTimeout(()=> setNotification(''),5000)
    //extend this to show notification and to "navigate to the anecdotes route"
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

   /* const match = useMatch('/anecdote/:id')
    const anecdote = match ? anecdoteById(Number(match.params.id)) : null
*/
  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Routes>
        <Route path='/' element={ <AnecdoteList anecdotes={anecdotes} notification={notification}/>}/>
        <Route path='/create' element={<CreateNew addNew={addNew} />}/>
        <Route path='/anecdote/:id' element={<AnecdoteDisplay anecdotes={anecdotes}/>}/>
      </Routes>
   
      <About />

      <Footer />
    </div>
  )
}

export default App
