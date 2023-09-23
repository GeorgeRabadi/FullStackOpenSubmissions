import { useDispatch, useSelector } from 'react-redux'
import {addVote} from '../reducers/anecdoteReducer.js'
import {notificationChange, notificationReset} from '../reducers/notificationReducer.js'

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

    const vote = (id, anecdote) => {
            
        dispatch(addVote(id))
        dispatch(notificationChange(anecdote))

        setTimeout(() => {
            dispatch(notificationReset())
        }, 5000);

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
                        <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>
            )}
        </>
        )
}

export default AnecdoteList