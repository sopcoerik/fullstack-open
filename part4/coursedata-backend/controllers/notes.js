const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

notesRouter.get('/', (request, response) => Note.find({}).then(notes => response.json(notes)))

notesRouter.get('/:id', (request, response, next) => {
  Note.findById(request.params.id).then(note => {
    if(note) {
      response.json(note)
    } else {
      response.status(404).send('<h1>404 | Note not found!</h1>')
    }
  }).catch(err => next(err))
})

notesRouter.delete('/:id', (request, response) => Note.findByIdAndDelete(request.params.id).then(() => response.status(204).end()))

notesRouter.put('/:id', (req, res, next) => {
  const { content, important } = req.body

  Note.findByIdAndUpdate(req.params.id, { content, important }, { new: true, runValidators: true, context: 'query' })
    .then(updatedNote => res.json(updatedNote))
    .catch(error => next(error))
})

notesRouter.post('/', (request, response, next) => {
  const body = request.body

  if(!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false
  })

  note.save()
    .then(savedNote => response.json(savedNote))
    .catch(error => next(error))
})

module.exports = notesRouter