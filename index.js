const { request, response } = require('express')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))

morgan.token('body', function(req, res) {
  return JSON.stringify({
    name: req.body.name,
    number: req.body.number
  })
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


let names = [
      {
        "name": "Arto Hellas",
        "number": "011",
        "id": 1
      },
      {
        "name": "Ada Luvleis",
        "number": "666-666-666-66-6",
        "id": 3
      },
      {
        "name": "Tämän Voipi Poistaa",
        "number": "00770554466566555555",
        "id": 2
      },
      {
        "name": "joulupukki",
        "number": "65488888",
        "id": 12
      },
      {
        "name": "Petri Kivipuro",
        "number": "123456789",
        "id": 13
      },
      {
        "name": "kakka pää",
        "number": "57575",
        "id": 14
      }
    ]
    app.get('/api/names', (request, response) => {
      response.json(names)
    })

    app.get('/info', (request, response) =>{
      const listLength = names.length
      response.send("Phonebook has info for " + listLength + " people" + '</br>' + new Date())
    } )


    const generateId = () => {
      const maxId = names.length > 0
        ? Math.max(...names.map(n => n.id))
        : 0
      return maxId + 1
    }
    app.post('/api/names', (request, response) => {
      const body = request.body
      
      if(!body.name) {
        return response.status(400).json({
          error: 'name missing'
        })
      }
      if(!body.number) {
        return response.status(400).json({
          error: 'number missing'
        })
      }
      if(names.some(person => person.name.toLowerCase() === body.name.toLowerCase()))
      {
        return response.status(400).json({
          error: body.name + ' is already in phonebook'
        })
      }
      
             const name = {
          name: body.name,
          number: body.number,
          id: generateId(),
      }
      names = names.concat(name)
    
      response.json(name)
    })

    
       app.get('/api/names/:id', (request, response) => {
        const id = Number(request.params.id)
        const name = names.find(name => name.id === id)
        
        if(name) {
            response.json(name)
        } else{
            response.status(404).end()
        }
        })

        app.delete('/api/names/:id', (request, response) => {
            const id = Number(request.params.id)
            names= names.filter(name => name.id !== id)

            response.status(204).end
        })
        console.log(request.headers)

const PORT = process.env.PORT || 3001
app.listen(PORT, () =>{

  console.log(`Server running on port ${PORT}`)
})