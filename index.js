const express = require('express')
const cors = require('cors')

const logger = require('./loggerMidleware')
const app = express()

app.use(cors())
app.use(express.json())

app.use(logger)

let notes = [
    {
        'id': 1,
        'content': 'Tengo que subir el proyecto esta semana',
        'important': true
    },
    {
        'id': 2,
        'content': 'Tengo que comprar telefono',
        'important': true
    },
    {
        'id': 3,
        'content': 'Tengo que hacer ejercicio',
        'important': false
    }
    
]
// const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'application/json'})
//     response.end(JSON.stringify(notes))
// })

app.get('/', (request, response) => {
    response.send('<h1>Hello Brayan</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)

    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})

app.post('/api/notes', (request, response) => {
    const note = request.body

    if(!note || note.content) {
        return response.status(400).json({
            error: 'note.content is a missing'
        })
    }
    
    const ids = notes.map(note => note.id)
    const maxId = Math.max(...ids)

    const newNote = {
        id: maxId + 1,
        content: note.content,
        important: typeof note.important !== 'undefined' ? note.important : false
    }

    notes = note.concat(newNote)

    response.status(2001).json(newNote)
} )

app.use((request, response) => {
    response.status(404).json({
        error: "Not found"
    })
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)

