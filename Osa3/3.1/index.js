//const http = require('http')
const express = require('express')
const app = express()

app.use(express.json())

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2022-01-10T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2022-01-10T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2022-01-10T19:20:14.298Z",
      important: true
    }
  ]
  let persons = [
    {
      id: 1,
      name: "Keijo Kuusinen",
      number: "0501231231",
    },
    {
      id: 2,
      name: "Martti Koisola",
      number: "0501231232",
    },
    {
      id: 3,
      name: "Seppo Taalasmaa",
      number: "0501231233",
    }
  ]
  let infos = [
    {
      text: `Phonebook has info for ${persons.length} people`,
      date: Date(),
    },
  ]
 //Info
 app.get('/', (request, response) => {
  response.send('<h1>Hello world</h1>')
  response.end(JSON.stringify(infos))
})
 app.get('/api/infos/:id', (request, response) => {
  const id = Number(request.params.id)
  const info = infos.find(info => info.id === id)
  if(info) {
    response.json(info)
  } else {
    response.status(404).end()
  }
}) 
app.get('/api/infos', (request, response) => {
  response.json(infos)
})

//Persons
app.get('/', (request, response) => {
  response.send('<h1>Hello world</h1>')
  response.end(JSON.stringify(persons))
})
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if(person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
}) 
app.get('/api/persons', (request, response) => {
  response.json(persons)
})
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  person = persons.filter(person => person.id !== id)
  //Jos poisto onnistuu vastataan statuskoodilla 204.
  response.status(204).end()
})
//Notes
app.get('/', (request, response) => {
    response.send('<h1>Hello world</h1>')
    response.end(JSON.stringify(notes))
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  if(note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
}) 
app.get('/api/notes', (request, response) => {
  response.json(notes)
})
app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  //Jos poisto onnistuu vastataan statuskoodilla 204.
  response.status(204).end()
})
const generateId = () => {
  const maxId = notes.length > 0
  ? Math.max(...notes.map(n => n.id))
  : 0
return maxId + 1
}
app.post('/api/notes', (request, response) => {
  const body = request.body
  if(!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }
  const note = {
    content: body.conntent,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  }
  notes = notes.concat(note)
  response.json(note)
})
/*
app.get('/api/notes', (request, response) => {
  response.json(notes)
})
*/
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
  
