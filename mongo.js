const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
console.log('connecting to', url)

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(result => {
  console.log('connected to Mongodb')
})
.catch((error) => {
  console.log('error connectiong to mongodb', error.message)
})

const nameSchema = new mongoose.Schema({
  name: String,
  number: String,
})

nameSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Name', nameSchema)

const Name = mongoose.model('Name', nameSchema)

 const name = new Name({
  name: 'Baavnbmvbaaaaaaa',
  number: 4645645544,
})

if (process.argv.length === 3) {

  Name.find({}).then(result => {
    result.forEach(name => {
      console.log(name.name + " " + name.number)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length > 3) {
  const nameHuman = process.argv[3]
  const numer = process.argv[4]
  const name = new Name({
    name: nameHuman,
    number: numer
  })
  name.save().then(result => {
    console.log('added Name: ' + name.name + ", Number: " + name.number + " to the phonebook")
    mongoose.connection.close()
  })
}
