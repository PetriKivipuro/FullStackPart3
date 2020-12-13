const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://user_pete:${password}@cluster0.fqk8y.mongodb.net/ihmistiedot?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const nameSchema = new mongoose.Schema({
  name: String,
  number: String,
  })

const Name = mongoose.model('Name', nameSchema)

const name = new Name({
  name: 'Baaaaaaaaa',
  number: 46544,
  })

 const find = Name.find({}).then(result => {
    result.forEach(name => {
        console.log(name.name + " " + name.number)
    })
    mongoose.connection.close()
  }) 


  // saves new name
 /* name.save().then(result => {
  console.log('added ' + name.name+ " " + name.number + " to the phonebook" )
  mongoose.connection.close()
})  */
