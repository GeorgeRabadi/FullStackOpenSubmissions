import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user)) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newNote,
      author: Math.random() > 0.5,
    }
  
    blogObject
      .create(blogObject)
        .then(returnedBlog => {
        setNotes(blogs.concat(returnedBlog))
        setNewNote('')
      })
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }



  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h1>Log in to application</h1>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogForm = () => (
    <>
    <h1>Blogs</h1>
    <div>{blogs.map( (blog, i) => <Blog key={i} blog = {blog}/> )}</div>
    <form onSubmit={addBlog}>
      <div>Title</div>
      <input
        value={newTitle}
        onChange={handleTitleChange}
      />
      <br />
      <div>Author</div>
      <input
        value={newAuthor}
        onChange={handleAuthorChange}
      />
      <button type="submit">save</button>
    </form>
    <br />
    <button onClick={() => Logout()}>Logout</button>
    </>
      
  )

      
  const Logout = () =>
  {
    localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)

  }


  return (
    <div>
      <Notification message={errorMessage} />
      {user === null && loginForm()}
      {user !== null && blogForm()}
    </div>
  )
}

export default App