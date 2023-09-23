import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import anecdoteService from './services/anecdotes'
import  {createAnecdotes} from './reducers/anecdoteReducer'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const App = () => {

  const dispatch = useDispatch() 

  useEffect(() => { 
    anecdoteService      
     .getAll().then(anecdotes => dispatch(createAnecdotes(anecdotes)))  
    }, [])

  return (
    <div>
      <Notification />
      <Filter />
      <AnecdoteForm />
    </div>
  )
}


export default App