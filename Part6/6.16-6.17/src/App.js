import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import  {createAnecdotes} from './reducers/anecdoteReducer'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const App = () => {

  const dispatch = useDispatch() 

  useEffect(() => { 
    dispatch(createAnecdotes())
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