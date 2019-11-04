const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs.js')
//require('dotenv').config()
//const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

console.log('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
//    console.log('connected result:', result)
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(cors())
//app.use(express.static('build'))
app.use(bodyParser.json())
app.use('/api/blogs', blogsRouter)

module.exports = app
