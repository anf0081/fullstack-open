const express = require('express')
var morgan = require('morgan')
require('dotenv').config()
const app = express()
const mongoose = require('mongoose')
mongoose.set('strictQuery',false)

app.use(express.static('dist'))

app.use(express.json())

morgan.token('body', req => {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const Person = require('./models/person')



const generateId = () => {
    let randomId = String(Math.floor(Math.random() * 1000000))
    while(persons.some(person => person.id === randomId)) {
        randomId = String(Math.floor(Math.random() * 1000000))
    }
    return randomId
}

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
      response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = Person.findById(id)
    .then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }})
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
  const date = new Date()
  response.send(`<p>Phonebook has info for ${persons.length} people.</p>
    <p>${date}</p>`)
})


app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
    } else if (!body.number) {
       return response.status(400).json({ 
        error: 'number missing' 
        }) 
    } else if (persons.some(person => person.name === body.name)) {
        return response.status(400).json({ 
        error: 'name already exists' 
        }) 
    }
    
    const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
    }

    persons = persons.concat(person)
    response.json(person)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)