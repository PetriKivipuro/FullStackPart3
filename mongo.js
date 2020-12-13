const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://user_pete:${password}@cluster0.fqk8y.mongodb.net/ihmistiedot?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const nameSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Name = mongoose.model('Name', nameSchema)

/* const name = new Name({
  name: 'Baavnbmvbaaaaaaa',
  number: 4645645544,
}) */

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
