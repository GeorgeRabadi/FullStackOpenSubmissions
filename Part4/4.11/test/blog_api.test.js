const supertest = require('supertest')
const mongoose = require('mongoose')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')


beforeEach(async () => {

  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
  
})


test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
const response = await api.get('/api/blogs')

expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('identifier property is named id', async () => {

  const response = await api.get('/api/blogs')

  response.body.map(blog => expect(blog.id).toBeDefined())
  
    
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: "exampleTitle",
    author: "exampleAuthor",
    url: "exampleURL",
    likes: 3
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)


  const titles = blogsAtEnd.map(n => n.title)
  expect(titles).toContain(
    'exampleTitle'
  )
})

test('likes property is missing ', async () => {

  const blog = {
    title: "exampleTitle",
    author: "exampleAuthor",
    url: "exampleURL",
  }

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
  
    const newBlog = blogsAtEnd.find(n => n.title === blog.title && n.author === blog.author && n.url === blog.url)
    expect(newBlog.likes).toEqual(0)


})