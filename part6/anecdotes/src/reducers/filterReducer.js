
import { createSlice } from '@reduxjs/toolkit'



const initialState = ''


const filterSlice = createSlice({
name: 'filter',
initialState,
reducers: {  //so this returns state of a filter object defined on our store.
    filterReducer  (state, action) {
    console.log('insides of filter reducer',JSON.parse(JSON.stringify(action, state)));
       //rest is handled inside app.js
    return action.payload
    
    }
}
})

export const {filterReducer} = filterSlice.actions
export default filterSlice.reducer