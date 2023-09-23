import { useSelector, useDispatch} from 'react-redux'
import {addVote} from '../reducers/anecdoteReducer.js'

const AnecdoteList = () =>
{

      
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const vote = (content, id, votes) => {

        console.log('vote', id)
            
        dispatch(addVote(content, id, votes))

    }


    return(
        <>
            <h2>Anecdotes</h2>
          {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.content, anecdote.id, anecdote.votes)}>vote</button>
                </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList