import { useDispatch, useSelector } from 'react-redux'
import {addNewVote} from '../reducers/anecdoteReducer.js'
import {setNotification} from '../reducers/notificationReducer.js'

const AnecdoteList = () =>
{

      
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        if ( filter === '' ) {
          return anecdotes
        }

        return anecdotes.filter(anecdote => anecdote.content.includes(filter))

      })

      console.log(anecdotes)
      
      //    
    
    const dispatch = useDispatch()

    const vote = (id, anecdote, votes) => {
            
        const newAnecdote = {
            content: anecdote,
            id: id,
            votes: votes + 1
        }

        dispatch(addNewVote(id, newAnecdote))
        dispatch(setNotification(`you voted '${anecdote}'`, 1000))

    
    }


    return(
        <>
            <h2>Anecdotes</h2>
            {anecdotes.toSorted((a,b) => b.votes - a.votes).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id, anecdote.content, anecdote.votes)}>vote</button>
                    </div>
                </div>
            )}
        </>
        )
}

export default AnecdoteList