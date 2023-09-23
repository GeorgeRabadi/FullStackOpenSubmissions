import { useMutation, useQueryClient   } from '@tanstack/react-query'
import { addAnecdote } from '../requests'

const AnecdoteForm = () => {

  const queryClient =  useQueryClient() 


  const newAnecdoteMutation = useMutation(addAnecdote, {
  onSuccess: () => {      
    queryClient.invalidateQueries({ queryKey: ['anecdotes'] })    
  },
})


  const onCreate = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(anecdote)
}



  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
