const supertest = require('supertest')
const mongoose = require('mongoose')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const { notesInDb } = require('../../part4/test/test_helper')


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

test('a valid blog can be added', async () => {


  const loggedUser = {
    username: "User",
    password: "User"
  }


  const token = 'Bearer '.concat((await api
    .post('/api/login')
    .send(loggedUser)
    .expect(200)).token)


  const newBlog = {
    title: "exampleTitle",
    author: "exampleAuthor",
    url: "exampleURL",
    likes: 3
  }

  await api
    .post('/api/blogs')
    .set('Authorization' , token) 
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

test('title is missing ', async () => {

  const blog = {
    author: "exampleAuthor",
    url: "exampleURL"
  }

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(400)


})

test('url is missing ', async () => {

  const blog = {
    title: "exampleTitle",
    author: "exampleAuthor"
  }

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(400)


})

test('delete succeeds with status code 204 if id is valid', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )

  const titles = blogsAtEnd.map(r => r.title)

  expect(titles).not.toContain(blogToDelete.titles)

})

test('put succeeds with status code 200 if id is valid', async () => {

  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const updatedBlog = {
    title: "newExampleTitle",
    author: "newExampleAuthor",
    url: "newExampleURL",
    likes: 5
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()

  const titles = blogsAtEnd.map(r => r.title)

  expect(titles).toContain("newExampleTitle")  

})