const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  passwordHash: String,
  verified: Boolean,
  vkey: String,
  dishes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dish'
  }], 
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User