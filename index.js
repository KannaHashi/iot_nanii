const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const app = express()
const User = require('./models/User')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}, () => {
  console.log('Dah konek, tempec!')
})

const http = require('http').createServer(app)

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

// Set Kartu yang mau di register
let CardUID = ""
app.post('/set_card_uid', (req,res) => {
  CardUID = req.body.card_uid
  console.log(req.body)
  return res.status(200).json({message : "Success!", card_uid: req.body.card_uid})
})

// Cek Kartu yang sedang aktif
app.get('/card', (req,res) => {
  console.log(CardUID)
  return res.status(200).json({card_uid: CardUID})
})

// Registrasi kartu ke Database

/* 
  Form registrasi
  Buka http://localhost/register_card untuk me-registrasi kartu
*/

app.get('/register_card', async(req,res) => {
  const checkData = await User.findOne({card_uid: CardUID})
  console.log(checkData)

  let form_data = {
    card_uid: CardUID,
    user_name: "",
    coins: 0
  }

  if(checkData) {
    form_data = {
      card_uid: CardUID,
      user_name: checkData.user_name,
      coins: checkData.coins
    }
  }
  res.render('register', {form_data})
})

// Mengirim data hasil registrasi ke database
app.post('/register_card', async(req,res) => {
  await User.findOneAndUpdate({
    card_uid: CardUID
  }, {
    card_uid: CardUID,
    user_name: req.body.user_name,
    coins: 0
  }, {
    new: true,
    upsert: true
  }).then(() => {
    const data_sent = {
      card_uid: CardUID,
      user_name: req.body.user_name,
      coins: 0
    }
    return res.status(200).json({message: "Success!", data_received: data_sent})
  }).catch(e => {
    console.error(e)
  })
})

/*
API Endpoint

POST http://localhost/set_card_uid --> Set kartu yang mau diregistrasi
GET http://localhost/card --> Cek kartu yang sedang aktif (yang sudah di-set di '/set_card_uid')
GET http://localhost/register_card --> Dibuka di Browser, isi form untuk me-registrasi kartu
POST http://localhost/register_card --> Proses memasukkan data dari form registrasi ke database
*/

http.listen(80, () => {
  console.log('Listening to port 80')
})