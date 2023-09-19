import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  const createBlog = (blogObject) =>
  {
      blogService
      .create(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
  }

    
  const like = (blog) =>
  {
      blog.likes++

      const blogObject =
      {
        user: blog.user,
        likes: blog.likes,
        author: blog.author,
        title: blog.title,
        url: blog.url
  
      }
      

      blogService
      .update(blog.id, blogObject)
  }

  const deleteBlog = (blog) =>
  {

      blogService
      .deleteBlog(blog.id, blog.user)
    
  }

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
      setErrorMessage(user.username + " logged into the application")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
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

  const blogForm = () => {
    
    return (
    <>
    <h1>Blogs</h1>
    <br />
    <div>{blogs.sort((a,b) => b.likes - a.likes).map( (blog, i) => <Blog key={i} blog = {blog} like = {like} deleteBlog={deleteBlog} user={user}/> )}</div>
    <Togglable buttonLabel = "Add new blog">
      <BlogForm createBlog = {createBlog} />
    </Togglable>
    <br />
    <button onClick={() => Logout()}>Logout</button>
    </>
      
  )
    }
      
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