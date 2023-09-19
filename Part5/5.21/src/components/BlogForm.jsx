import { useState } from 'react'
import blogService from '../services/blogs'
import blogs from '../services/blogs'

const BlogForm = ({createBlog}) =>
{
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newURL, setnewURL] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        const blogObject = {
          title: newTitle,
          author: newAuthor,
          url: newURL,
          likes: 0,
        }

        createBlog(blogObject)   
      }
    

    return (

      <form onSubmit={addBlog}>
        <div>Title</div>
        <input
          value={newTitle} id='Title'
          onChange={(event) => setNewTitle(event.target.value)}
        />
        <br />
        <div>Author</div>
        <input
          value={newAuthor} id='Author'
          onChange={(event) => setNewAuthor(event.target.value)}
        />
        <div>URL</div>
        <input
          value={newURL} id='URL'
          onChange={(event) => setnewURL(event.target.value)}
        />
        <br />
        <button type="submit">Create</button>
      </form>
    )
}

export default BlogForm