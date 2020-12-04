const { request, response } = require('express')
const express = require('express')
const app = express()

app.use(express.json())

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

    const generateId = () => {
      const maxId = names.length > 0
        ? Math.max(...names.map(n => n.id))
        : 0
      return maxId + 1
    }
    app.post('/api/names', (request, response) => {
      
      if(!body.content) {
        return response.status(400).json({
          error: 'content missing'
        })
      }
             const name = {
          content: body.content,
          important: body.important || false,
          date: new Date(),
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
            response.status(400).end()
        }
        })

        app.delete('/api/names/:id', (request, response) => {
            const id = Number(request.params.id)
            names= names.filter(name => name.id !== id)

            response.status(204).end
        })
        console.log(request.headers)

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)