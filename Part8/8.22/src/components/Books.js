import { useState, useEffect } from "react"
import { BOOKS_BY_GENRE, ALL_BOOKS } from '../queries'
import { useQuery } from "@apollo/client"

const Books = (props) => {

  const [books, setBooks] = useState(props.books)
  const [genre, setGenre] = useState(null)
  const booksByGenre = useQuery(BOOKS_BY_GENRE, { variables: { genre} },{
    update: (cache, response) => {      
      cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {        
        return {          
          allBooks: allBooks.concat(response.data.addBook),        
        }      
      })    
    }})

  useEffect(() => {
    if ( booksByGenre.data ) {
      setBooks(booksByGenre.data.allBooks)
      console.log(books)
    }
  }, [booksByGenre.data ])


  if (!props.show) {
    return null
  }


  const genres = [].concat(...books.map(book => book.genres))

  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
  }

  const genreList = genres.filter(onlyUnique)

  const unfilterGenre = () => {
      
      setBooks(props.books)
      setGenre(null)   

  }

  const filterGenre = (selectedGenre) => {

    setGenre(selectedGenre)

  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name }</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>{genre === null ? genreList.map(genre => <button key={genre} onClick = {() => filterGenre(genre)}>{genre}</button>) : <button onClick={() => unfilterGenre()}>return</button>}</div>
    </div>
  )
}

export default Books
