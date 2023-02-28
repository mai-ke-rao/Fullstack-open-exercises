const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]
const url =
  `mongodb+srv://bilde:${password}@clus0.bpumznl.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
const Person = mongoose.model('Person', personSchema)
if(process.argv.length<4)
{
  Person.find({}).then(result => {
    result.forEach(persons => {
      console.log(persons);
    })
    mongoose.connection.close()
  })

}


const person = new Person({name: name,number: number})


person.save().then(result => {
  console.log('person saved!')
  mongoose.connection.close()
})
module.exports = mongoose.model('Person',  personSchema)