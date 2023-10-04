import { useState } from "react"

const Books = (props) => {

  const [books, setBooks] = useState(props.books)
  const [genreCounter, setGenreCounter] = useState(0)
  

  if (!props.show) {
    return null
  }

  const genres = [].concat(...books.map(book => book.genres))

  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
  }

  const genreList = genres.filter(onlyUnique)
  console.log(genreList)

  const unfilterGenre = () => {

      setBooks(props.books)
      setGenreCounter(0)
   

  }

  const filterGenre = (selectedGenre) => {

    const filteredBooks = books.filter(book => book.genres.find(genre => genre == selectedGenre) != undefined)
    console.log(filteredBooks)
    setBooks(filteredBooks)
    setGenreCounter(1)


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
      <div>{genreCounter == 0 ? genreList.map(genre => <button key={genre} onClick = {() => filterGenre(genre)}>{genre}</button>) : <button onClick={() => unfilterGenre()}>return</button>}</div>
    </div>
  )
}

export default Books
