const express = require('express')
const app = express()
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

// mongodb+srv://arcane-basin-46776:<password>@cluster0-a3ltf.mongodb.net/test?retryWrites=true&w=majority

let persons = [
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
    const entries = Number(persons.length)
    const date = new Date()
    response.send(`<div>Phonebook has info for ${entries} people</br></br>date ${date}</div>`)
  })
  
app.get('/persons', (req, res) => {
  res.json(persons)
})

app.get('/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

const generateId = () => {
  let id = Math.floor(Math.random() * 10)
  if (persons.find(person => person.id === id))
  {
    id = Math.max(...persons.map(person => person.id)) + 1
  }
  return id
}

app.post('/persons', (request, response) => {
  const body = request.body
//  console.log(body)

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
  if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({ 
        error: 'name must be unique' 
      })
    }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }
  persons = persons.concat(person)
  response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
