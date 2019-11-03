require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(bodyParser.json())
morgan.token('postjson', function (req, res) {
    if (req.method !== 'POST') return ' ';
    return JSON.stringify(req.body)
  })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postjson'))

app.use(cors())
app.use(express.static('build'))

let personsX = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122"
  },
  {
    id: 5,
    name: "Matti M",
    number: "11-22-3333"
  }]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    Person.count().then(count => {
        const date = new Date()
        response.send(`<div>Phonebook has info for ${count} people</br></br>date ${date}</div>`)
      });
  })
  
app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
      res.json(persons.map(person => person.toJSON()))
    });
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person.toJSON())
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    console.log('starting delete  person:', request.params)
    Person.findByIdAndRemove(request.params.id).then( person => {
      console.log('delete person:', person)
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  if (!body.name) {
    return response.status(400).json({ 
      error: 'name is missing' 
    })
  }
  if (!body.number) {
    return response.status(400).json({ 
      error: 'number is missing' 
    })
  }
//  if (persons.find(person => person.name === body.name)) {
//    return response.status(400).json({ 
//        error: 'name must be unique' 
//      })
//    }

  const person = new Person({
    name: body.name,
    number: body.number
  })
  person.save().then(savedPerson => {
    response.json(savedPerson.toJSON())
  })
  .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.log('virhekasittelija alkaa')
    console.error(error.message)
    console.log('----------------------')
    console.log('error.name:', error.name)
    console.log('error.kind:', error.kind)
    console.log('error.code:', error.code)
    console.log('----------------------')

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}
app.use(errorHandler)

//const PORT = process.env.PORT || 3001
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('no')
//  console.log(`Server running on port ${PORT}`)
  console.log('miitaa')
})
