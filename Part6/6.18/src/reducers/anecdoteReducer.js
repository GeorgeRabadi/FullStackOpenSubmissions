import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'


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
    setAnecdotes(state, action){
      return action.payload
    }
  },

})




export const { addVote, addAnecdote,  setAnecdotes} = anecdoteSlice.actions

export const  createAnecdotes = () =>
{
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes)) 
  }
  
}

export const addNewAnecdote = content =>
{
  return async dispatch => {
    const anecdotes = await anecdoteService.createNew(content)
    dispatch(addAnecdote(anecdotes)) 
  }
}


export const addNewVote = (id, anecdote) =>
{
  return async dispatch => {
    await anecdoteService.addVote(id, anecdote)
    dispatch(addVote(id)) 
  }
}



export default anecdoteSlice.reducer