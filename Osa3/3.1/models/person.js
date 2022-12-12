const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })
/*
  const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
    important: Boolean,
  })
*/
const contactSchema = new mongoose.Schema({
  
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    minlength: 8,
    validate: {
      validator: val = (v) => {
        
        return (/\d{3}-\d{5}/.test(v) || /\d{2}-\d{6}/.test(v))
      },
      message: props => `${props.value} is not a valid phone number, too few numbers or "-" may be required after the first 2 or 3 numbers.`
    },
    required: "-",
    required: true,
  },
  important: Boolean,
})

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Contact', contactSchema)