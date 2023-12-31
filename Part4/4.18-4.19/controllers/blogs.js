const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}


blogRouter.get('/', async (request, response) => { 
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})


blogRouter.post('/', async (request, response) => {

  const body = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)


  const blog =  new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id

  })

  if(blog.likes === undefined)
    blog.likes = 0

  if(blog.title === undefined || blog.url === undefined)
    response.status(400).end()

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)

  
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})


blogRouter.put('/:id', async(request, response) => {

  const body = request.body

  const blog =  {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  


  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }) 
  response.status(200).end()

})


module.exports = blogRouter