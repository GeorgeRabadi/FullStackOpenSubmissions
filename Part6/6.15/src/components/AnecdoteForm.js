import { useDispatch } from 'react-redux'
import {addAnecdote} from '../reducers/anecdoteReducer.js'
import AnecdoteList from './AnecdoteList.js'

const AnecdoteForm = () =>
{
    
    const dispatch = useDispatch()

    const generateId = () =>
    Number((Math.random() * 1000000).toFixed(0))

    const add = (event) =>
    {
        event.preventDefault()
        const anecdote = {
        content: event.target.anecdote.value,
        id: generateId(),
        votes: 0
        }

        dispatch(addAnecdote(anecdote))

        }

        return(

        <>
            <AnecdoteList />           
            <h2>create new</h2>
            <form onSubmit={add}>
                <div><input name="anecdote"/></div>
                <button >create</button>
            </form>
        </>
        )

  
}

export default AnecdoteForm