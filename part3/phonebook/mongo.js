const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://info:${password}@cluster0.zoihrya.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 3,
    required: true
  },
})

const Person = mongoose.model('Person', personSchema, 'persons')

if ( name && number ) {
  const person = new Person({
    name: typeof name === 'string' ? name : name.toString,
    number: typeof number === 'string' ? number : number.toString,
  })
  person.save().then(() => {
    console.log('person saved!')
    mongoose.connection.close()
  })
} else {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}