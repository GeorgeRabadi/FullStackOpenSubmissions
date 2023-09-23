import { createSlice } from '@reduxjs/toolkit'


const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: initialState,
  reducers: {
    addVote(state, action){

      const id = action.payload
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {...anecdoteToChange, votes: anecdoteToChange.votes + 1}
      return state.map(anecdote => anecdote.id === id ? changedAnecdote : anecdote)

    },
    addAnecdote(state, action){
    
      const anecdote = action.payload
      state.push(anecdote)
    
    },
    createAnecdotes(state, action)
    {
      return action.payload
    }
  },

})




export const { addVote, addAnecdote, createAnecdotes  } = anecdoteSlice.actions
export default anecdoteSlice.reducer