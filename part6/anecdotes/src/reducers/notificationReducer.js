import { createSlice } from '@reduxjs/toolkit'

const initialState ="begining is the hardest"

const notificationSlice = createSlice({
    name: 'notification',
    initialState:initialState,
    reducers:{
        notificationReducer(state, action){
           
            return action.payload
            
        },
        removeNotification(state,action){
         
            return ""
    }
}})
export const {notificationReducer,removeNotification} = notificationSlice.actions

export const setNotification = (quote, time) => {
    console.log('i am inside actionCreator');
    return  (dispatch) => {
        
      
         dispatch(notificationReducer(quote))
         setTimeout(()=> 
         dispatch(removeNotification())
          , time*1000) 
         
    }
  }

export default notificationSlice.reducer