import { useState, useEffect } from "react"
import {EDIT_YEAR, ALL_AUTHORS } from '../queries'
import { useMutation } from '@apollo/client'

const Authors = (props) => {

  
  const authors = props.authors
  const [name, setAuthor] = useState('')
  const [born, setYear] = useState('')

  const [ editYear, result ] = useMutation(EDIT_YEAR, {
    refetchQueries: [ { query: ALL_AUTHORS } ] 
  })

  
  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      console.log('person not found')
    }
  }, [result.data])

  if (!props.show) {
    return null
  }

  const changeYear = (event) =>
  {
    event.preventDefault()

    editYear({ variables: { name, born } })

    setAuthor('')
    setYear('')

  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <div>
        <form onSubmit={changeYear}>
          <div>
            Name
            <input
              value={name}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            Year
            <input
            type="number"
              value={born}
              onChange={({ target }) => setYear(parseInt(target.value))}
            />
          </div>
          <button type="submit">edit year</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
