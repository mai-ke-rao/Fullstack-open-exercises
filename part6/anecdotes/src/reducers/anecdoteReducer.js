import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/Anecdotes'
// OVDE KORISTIM DISPACH IAKO GA NISAM UVEO, TAKO MORA


const createAnecdote = createSlice({ 
  name: 'anecdote',
  initialState: [],
  reducers:{

  newAnecdote(state, action) {


//I would add here post request
state.push(action.payload)
},
appendVote(state,action){  
  const id = action.payload.id
  const anecdoteToChange = state.find(anecdote => anecdote.id === id)
  
  const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }
  const updatedAnecdotes = state.map(anecdote =>
    anecdote.id !== id ?
      anecdote :
    changedAnecdote
  )
  
  return updatedAnecdotes.sort((a,b) => b.votes - a.votes)
},
setAnecdotes(state,action){

  return action.payload
}

}})



export const {newAnecdote, appendVote, setAnecdotes} = createAnecdote.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
const quotes = await anecdoteService.getAll()
dispatch(setAnecdotes(quotes))}
}

export const addNew = (content) => {
  
  return async (dispatch) => {
 
    const newPost = await anecdoteService.createNew(content)
    dispatch(newAnecdote(newPost))
  }
}

export const voteAction = (quote) => {

  var temp = {...quote}
  temp.votes++
    
  return async (dispatch) => {
    let addedVote = await anecdoteService.addVote(temp)
    dispatch(appendVote(addedVote))
  }
}

export default createAnecdote.reducer 


