import { createSlice } from '@reduxjs/toolkit'

const initialState = " "

const notificationSlice = createSlice({
    name: 'notification',
    initialState: initialState,
    reducers: {
        notificationReducer(state = initialState, action){
           
            return action.payload
            
        },
        removeNotification(state,action){
         
            return ""
    }
}
})
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


