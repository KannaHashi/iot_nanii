const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const User = require('./models/User')
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://cotomks27:Chandra1250425@cluster0.dlu0f.mongodb.net/iot-shit?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true
}, () => {
  console.log('Dah konek, tempec!')
})

const http = require('http').createServer(app)

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

let CardUID = ""

app.post('/add_card', (req,res) => {
  CardUID = req.body.card_uid
  console.log(req.body)
  return res.status(200).json({message : "Success!", content_received: req.body.card_uid})
})

app.get('/card', (req,res) => {
  console.log(CardUID)
  return res.status(200).json({current_card: CardUID})
})

app.get('/register_card', async(req,res) => {
  const checkData = await User.findOne({card_uid: req.body.card_uid})

  let form_data = {
    card_uid: CardUID,
    user_name: "",
    coins: 0
  }

  if(checkData) {
    form_data = {
      card_uid: checkData.card_uid,
      user_name: checkData.user_name,
      coins: checkData.coins
    }
  }
  res.render('register', {form_data})
})

app.post('/register', async(req,res) => {
  await User.findOneAndUpdate({
    card_uid: req.body.card_uid
  }, {
    card_uid: req.body.card_uid,
    user_name: req.body.user_name,
    coins: 0
  }, {
    new: true,
    upsert: true
  }).then(() => {
    const data_sent = {
      card_uid: req.body.card_uid,
      user_name: req.body.user_name,
      coins: 0
    }
    return res.status(200).json({message: "Success!", data_received: data_sent})
  }).catch(e => {
    console.error(e)
  })
})

http.listen(80, () => {
  console.log('Listening to port 80')
})