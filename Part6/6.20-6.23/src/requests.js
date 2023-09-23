import axios from 'axios'

export const getAnecdotes = () =>
  axios.get('http://localhost:3001/anecdotes').then(res => res.data)

export const addAnecdote = (anecdote) =>
{
    const newAnecdote = {
        content: anecdote,
        id: Math.floor(Math.random() * 1000000),
        votes: 0
    
      }
    
      axios.post('http://localhost:3001/anecdotes', newAnecdote).then(res => res.data)  
}

export const addVote = anecdote =>
  axios.put(`${'http://localhost:3001/anecdotes'}/${anecdote.id}`, anecdote).then(res => res.data)