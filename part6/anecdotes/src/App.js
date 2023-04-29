import { useSelector, useDispatch } from 'react-redux'
import { voteAction, initializeAnecdotes} from './reducers/anecdoteReducer'
import { setNotification } from './reducers/notificationReducer'
import AnecdoteForm from './components/AnecdoteForm' 
import Filter from './components/Filter'
import Notification from './components/Notification'
import { notificationReducer,removeNotification } from './reducers/notificationReducer'
import {useEffect} from 'react'


//import AnecdoteList from './components/AnecdoteList'

const App = () => {
  const dispatch = useDispatch()

useEffect(()=> {
   
dispatch(initializeAnecdotes())

}, [dispatch])

  const anecdotes = useSelector(state => {
    if(state.filter === "")
{console.log("state filter = empty string");
  return state.anecdote}
  //sada ide real shit
  else if(state.filter !== "")
  {  
    //console.log("anecdotes are: ", getState());
    console.log("fitler is ",  state.filter);
 return state.anecdote.filter(quote => quote.content.includes(state.filter))
  }
})


  const vote = (id) => {
    console.log('vote', id)
    //ovde pozvati dispechera
    //dodati call za notifikaciju, imas anecdote vise ti ne treba
    dispatch(voteAction(id))
    /*let temp = {info: id.content,
      ajdi:'glasanje'}*/

      dispatch(setNotification(`you voted '${id.content}'`, 4))
     /* dispatch(notificationReducer(temp))
      setTimeout(()=> 
      dispatch(removeNotification())
       , 5000)*/
  }


  return (
    <div>
      <h2>Anecdotes</h2>
   
      {/*console.log(anecdotes, "anekdote u samom app rendereru")*/}
      
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
      <Filter/>
      
      {/*<AnecdoteList/>*/}
      <AnecdoteForm/>
      <Notification/>
    </div>
  )
}

export default App