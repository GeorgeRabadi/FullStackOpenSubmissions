require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.static('dist'))
const Phone = require('./models/note')

var morgan = require('morgan')

morgan.token('body', req => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const cors = require('cors')

app.use(cors())



let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/api/persons', (request, response) => {
  Phone.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Phone.findById(request.params.id).then(phone => {
    response.json(phone)
  })
})
  
app.delete('/api/persons/:id', (request, response) => {
    
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    
    response.status(204).end()
})


app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const person = new Phone({
    name: body.name,
    number: body.number 
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.get('/info', (request, response) => {

    const date = new Date()
    response.send('<div>Phonebook has info for ' + persons.length + ' people</div><br/><div> ' + date + ' </div>')

    
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})