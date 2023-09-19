import { useState } from "react"

const Blog = ({ blog , like, deleteBlog, user}) => 
{
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const displayButton = { display: blog.user.username === user.username ? '' : 'none' }


  return (
 
    <>

      <div>
      {blog.title}
      <button style={hideWhenVisible} onClick ={() => setVisible(true)}>Show details</button>
      </div>
      <br />
      <div style={showWhenVisible}>
        {blog.author}
        <br /> 
        {blog.url} 
        <br /> 
        {blog.likes} <button onClick ={() => like(blog)}>Like</button>
        <br /> 
        {blog.user.username}
        <br /> 
        <button style={displayButton} onClick ={() => deleteBlog(blog)}>Delete</button>
        <br /> 
        <button onClick ={() => setVisible(false)}>Less Details</button>
        <br /> 
      </div>
      <br />

    </>
     
   
  )
}

export default Blog