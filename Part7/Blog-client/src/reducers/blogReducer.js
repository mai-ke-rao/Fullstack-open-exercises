import { createSlice } from "@reduxjs/toolkit";

const blogsSlice = createSlice({
    name:'blogs',
    initialState:[],
    reducers:{   //to simple?
        createBlogReducer(state, action){
            return state.concat(action.payload)
        },
       /* addCommentReducer(state,action){
         return action.payload
        },*/
    getBlogsReducer(state, action){
        return action.payload
    }

    }
})

export const {createBlogReducer, getBlogsReducer, addCommentReducer} = blogsSlice.actions

export default blogsSlice.reducer

