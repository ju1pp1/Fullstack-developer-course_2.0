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
/*
  app.post('/api/notes', (request, response) => {
    const note = request.body
    console.log(note)
    response.json(note)
  })
  
  //DEL
  app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
  })
    */
    //GET
    //Nyt yksittäisen resurssin hakeminen toimii.
    /*
    app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
    })
    */
  /*
  app.get('/api/notes', (req, res) => {
    res.json(notes)
  })
  */


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
  
