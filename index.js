const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const app = express()
const User = require('./models/User')
const mongoose = require('mongoose')

// Routes
const item_route = require('./routes/item')
const user_route = require('./routes/user')
const card_route = require('./routes/card')

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}, () => {
  console.log('Dah konek, tempec!')
})

// Start http server
const http = require('http').createServer(app)

// ExpressJS Config
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.set('json spaces', 2)

// API EndPoint /card
app.use('/card', card_route)
app.use('/users', user_route)
app.use('/items', item_route)

/*
API Endpoint

---------------------------------------> RFID Card <--------------------------------------------------

GET http://localhost/card --> Cek kartu yang sedang aktif (yang sudah di-set di '/card/set_card_uid')
GET http://localhost/card/register_card --> Dibuka di Browser, isi form untuk me-registrasi kartu
POST http://localhost/card/set_card_uid --> Set kartu yang mau diregistrasi
POST http://localhost/card/register_card --> Proses memasukkan data dari form registrasi ke database

---------------------------------------> Shop Items <-------------------------------------------------

GET http://localhost/items --> Cek semua item yang terdaftar di Database
GET http://localhost/items/add_item --> Dibuka di Browser, isi form untuk menambahkan item baru ke Database
POST http://localhost/items/add_item --> Proses memasukkan data dari form registrasi ke database

----------------------------------------> User List <-------------------------------------------------
GET http://localhost/users --> Cek semua user yang terdaftar di Database

*/

http.listen(80, () => {
  console.log('Listening to port 80')
})