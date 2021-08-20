const {Schema, model} = require('mongoose')

const User = new Schema({
  card_uid: {
    type: String,
    require: true
  },
  user_name: {
    type: String,
    require: true
  },
  full_name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  phone_number: {
    type: String,
    require: true
  },
  coins: {
    type: Number,
    default: 0
  },
  diamond: {
    type: Number,
    default: 0
  }
})

module.exports = model('User', User);