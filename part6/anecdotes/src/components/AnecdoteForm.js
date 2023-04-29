import { useDispatch } from 'react-redux'
import { addNew } from '../reducers/anecdoteReducer'
import { notificationReducer,removeNotification } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
    
    const dispatch = useDispatch()

        const addQuote = (event) =>{
            event.preventDefault()
            const quote = event.target.quote.value
            event.target.quote.value = ""
             dispatch(addNew({content: quote,
              votes: 0}))
              
           
            let temp = {info: quote,
            ajdi:'kreacija'}
            dispatch(notificationReducer(temp))
            setTimeout(()=> 
             dispatch(removeNotification())
              , 5000)
            
            //call notifikaciju imas  kvot koji treba za displej
            }
          
return(<div>
    <h2>create new</h2>
      <form onSubmit={addQuote}>
        <div><input name='quote' /></div>
        <button type='submit'>create</button>
      </form></div>
)
}

export default AnecdoteForm