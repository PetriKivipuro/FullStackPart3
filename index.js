require('dotenv').config()
const { request, response } = require('express')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Name = require('./models/name')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())



morgan.token('body', function (req, res) {
  return JSON.stringify({
    name: req.body.name,
    number: req.body.number
  })
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/names', (request, response) => {
  Name.find(request.params).then(name => {
    response.json(name)
  })
})

app.get('/info', (request, response) => {
  const listLength = names.length
  response.send("Phonebook has info for " + listLength + " people" + '</br>' + new Date())
})


app.post('/api/names', (request, response, next) => {
  const body = request.body

  const name = new Name({
    name: body.name,
    number: body.number,
  })
  name.save().then(savedName => {
    response.json(savedName.toJSON())
  })
  .catch(error => next(error))
})


app.get('/api/names/:id', (request, response, next) => {
  Name.findById(request.params.id).then(name =>{
    response.json(name)
  })
  .catch(error => next(error))
})


app.delete('/api/names/:id', (request, response, next) => {
  Name.findByIdAndRemove(request.params.id).then(name => {
   response.status(204).end()
  })
  .catch(error => next(error))
})
console.log(request.headers)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if(error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'})
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
