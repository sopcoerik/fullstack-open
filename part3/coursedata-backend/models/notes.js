require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URL

mongoose.set('strictQuery',false)

console.log('connecting to MongoDB database')

mongoose.connect(url)
    .then(res => console.log('connected to MongoDB database'))
    .catch(err => console.log('error connecting to MongoDB database: ', err.message))

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})
    
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note', noteSchema)