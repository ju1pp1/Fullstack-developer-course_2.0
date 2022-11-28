const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  
  process.exit(1)
}

const password = process.argv[2]
const contactName = process.argv[3]
const contactNumber = process.argv[4]

const url =
  `mongodb+srv://jeremi:andersin92@cluster0.6w4o3n6.mongodb.net/phoneBook?retryWrites=true&w=majority`
// ÄLÄ TALLETA SALASANAA GITHUBIIN

mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
})

const Contact = new mongoose.model('Contact', contactSchema)

/*
const note = new Note({
  content: 'HTML is Easy',
  date: new Date(),
  important: true,
})
*/
const contact = new Contact({
  name: contactName,
  phone: contactNumber,
})
if (process.argv.length === 3) {
  Contact.find({}).then(result => {
    result.forEach(contact => {
      console.log(contact)
    })
    mongoose.connection.close()
  })
}
if (process.argv.length === 4) {
  console.log('Add number also.')
  process.exit(1)
}
if (process.argv.length === 5)
contact.save().then(result => {
  console.log('Added ' + contactName + ' number ' + contactNumber)
  mongoose.connection.close()
})
