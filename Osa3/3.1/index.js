//const http = require('http')
//const mongoose = require('mongoose')
const express = require('express')
const { format } = require('morgan')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
require('dotenv').config()
const Contact = require('./models/person')
const { request, text, response } = require('express')
const { db } = require('./models/person')
const person = require('./models/person')
/* 
const url =
  `mongodb+srv://jeremi:andersin92@cluster0.6w4o3n6.mongodb.net/phoneBook?retryWrites=true&w=majority`
*/
  // ÄLÄ TALLETA SALASANAA GITHUBIIN

//mongoose.connect(url)

/*
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
})

const Contact = new mongoose.model('Contact', contactSchema)
*/

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
    },
    {
      id: 4,
      name: "Jarmo",
      number: "035023035",
    },
  ]
  const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(requestLogger)

//app.use(morgan('tiny'))
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.body(req, res)
  ].join(' ')
}))

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
  const hello = Contact.find({}).then(persons => {
    let infos = [
      {
        text: `Phonebook has info for ${persons.length} people`, 
        date: Date(),
      },
    ]
    
    response.json(infos)
  })
  
  console.log(hello)
  
})

//Persons
app.get('/', (request, response) => {
  response.send('<h1>Hello world</h1>')
  response.end(JSON.stringify(persons)) //persons
})
app.get('/api/persons/:id', morgan('tiny'), (request, response, next) => {
  Contact.findById(request.params.id)
  .then(person => {
   if(person) {
    console.log(person.id)
    response.json(person)
   }
   else {
    response.status(404).end()
   }
  })
  .catch(error => next(error))
/*
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id) //persons
  if(person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
*/
}) 
app.get('/api/persons', (request, response) => {
  Contact.find({}).then(persons => {
  response.json(persons)
})
})
/*
contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
*/

app.delete('/api/persons/:id', (request, response, next) => {
  Contact.findByIdAndRemove(request.params.id)
  .then(result => {
      response.status(204).end()
  })
  .catch(error => next(error))

  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  //Jos poisto onnistuu vastataan statuskoodilla 204.
  response.status(204).end()
})

/*
app.delete('/api/persons/:id', (request, response, next ) => {
  Contact.findByIdAndRemove(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
  //Jos poisto onnistuu vastataan statuskoodilla 204.
})
*/

const generateID = () => {
  const randomID = persons.length > 0
  ? Math.random(...persons.map(p => p.id))
  : 0
  let randomiidee = randomID * 100
  return Math.round(randomiidee)
}
app.post('/api/persons', (request, response) => { //'api/persons'
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({
      error: 'name missing'
    })
  }
  if(!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }
  if(body.number === undefined) {
    return response.status(400).json({
      error: 'number missing'
    })
  }
  if(!body.number) {
    return response.status(400).json({
      error: 'number is missing'
    })
  }
  if( persons.findIndex((p) => p.name == body.name) != -1) {
    return response.status(400).json({
      error: 'name already exists'
    })
  }
  /*
  const person = {
    name: body.name,
    number: body.number,
    id: generateID(),
  }
*/
  const person = new Contact({
    name: body.name,
    number: body.number,
    important: body.important || false,
    id: generateID(),
  })
  persons = persons.concat(person)
    //response.json(person)

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})
/*
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number,
  }
  Contact.findByIdAndUpdate(request.params.id, person, {new: true})
  .then(updatedNumber => {
    response.json(updatedNumber)
  })
  .catch(error => next(error))
})
*/

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number,
    important: body.important,
  }
  Contact.findByIdAndUpdate(request.params.id, person, {new: true})
  .then(updatedPerson => {
    response.json(updatedPerson)
  })
  .catch(error => next(error))
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
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  }
  notes = notes.concat(note)
  response.json(note)
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if(error.name === 'CastError') {
    return response.status(400).send({ error: 'malformed id' })
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001 //3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
  
