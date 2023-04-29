import { useSelector, useDispatch } from 'react-redux'
import { voting} from '../reducers/anecdoteReducer'


const AnecdoteList= ()=> {
const anecdotes = useSelector(state => state)
const dispatch = useDispatch()

const vote = (id) => {
  console.log('vote', id)
  //ovde pozvati dispechera
  dispatch(voting(id))
}
return ({anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
        
      )}
)
    }
    export default AnecdoteList