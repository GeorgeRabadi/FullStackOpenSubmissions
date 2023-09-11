const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://georgenmjrabadi:${password}@cluster0.udnfgj6.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const phoneSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String
})

const Phone = mongoose.model('Phone', phoneSchema)

if(process.argv.length == 5)
{
    const phone = new Phone({
        id: Math.floor(Math.random() * 1000),
        name: process.argv[3],
        number: process.argv[4],
    })
    
    phone.save().then(result => {
      console.log('Added', phone.name, "number", phone.number)
      mongoose.connection.close()
    })
}
else
{
    Phone.find({}).then(result => {
        result.forEach(phone => {
          console.log("phonebook")
          console.log(phone.name, " ", phone.number)
        })
        mongoose.connection.close()
      })
}
