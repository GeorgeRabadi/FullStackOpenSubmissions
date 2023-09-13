const bcrypt = require('bcrypt')
const User = require('../models/user')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)


beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash})

    await user.save()
})

test('User below 3 characters cannot be created', async () => {


    const newUser = {
      username: '12',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect({
        error: 'User validation failed: username: Path `username` (`12`) is shorter than the minimum allowed length (3).'
      })

})


test('Password below 3 characters cannot be created', async () => {


    const newUser = {
      username: '123',
      password: '12',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect(
        {error: 'password length must be at least 3'}
      )

})


   
