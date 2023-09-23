import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient, useMutation  } from '@tanstack/react-query'
import { getAnecdotes, addVote } from './requests'

const App = () => {

  const queryClient =  useQueryClient() 

  const newVote = useMutation(addVote, {
  onSuccess: () => {      
    queryClient.invalidateQueries({ queryKey: ['anecdotes'] })    
  },
})


  const handleVote = (anecdote) => {
    const newAnecdote = 
    {
      content: anecdote.content,
      id: anecdote.id,
      votes: anecdote.votes + 1
    }
    
    newVote.mutate(newAnecdote)
  }

  const result = useQuery({    
    queryKey: ['anecdotes'],   
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false
  })  
  console.log(JSON.parse(JSON.stringify(result)))
  if ( result.isLoading ) {    
    return <div>loading data...</div>  }

  const anecdotes = result.data
  console.log(anecdotes)

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
