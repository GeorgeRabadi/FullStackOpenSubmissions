import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'
import { ALL_AUTHORS, ALL_BOOKS, ME } from './queries'
import { useQuery } from '@apollo/client'


const App = () => {

  const [page, setPage] = useState('authors')

  const resultAuthors = useQuery(ALL_AUTHORS)
  const resultBooks = useQuery(ALL_BOOKS)
  const genreQuery = useQuery(ME)
  const [token, setToken] = useState(null)

  if(token == null)
  return (
    <>
      <LoginForm setToken = {setToken} />
    </>

  )


  if (resultAuthors.loading || resultBooks.loading || genreQuery.loading)  {
    return <div>loading...</div>
  }

  const favouriteGenre = genreQuery.data.me.favouriteGenre
  console.log(favouriteGenre)
  const booksByGenre = resultBooks.data.allBooks.filter(book => book.genres.find(genre => genre == favouriteGenre) != undefined)


  const Logout = () => {

    localStorage.removeItem('user-token')
    setToken(null)

  }



  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommended')}>recommended</button>
        <button onClick={() => Logout()}>Logout</button>
      </div>

      <Authors show={page === 'authors'} authors={resultAuthors.data.allAuthors} />

      <Books show={page === 'books'} books={resultBooks.data.allBooks} />

      <NewBook show={page === 'add'} />

      <Recommended show={page === 'recommended'} books={booksByGenre}/>
    </div>
  )
}

export default App
