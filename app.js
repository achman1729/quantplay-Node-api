var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var cors = require("cors")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
require('dotenv').config()

var indexRouter = require("./routes/index")
var stocksRouter = require("./routes/stock")

var app = express()
const corsOptions = {
  // origin: 'https://quantify.netlify.app',
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))


const mongoURI=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.izu4g.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
console.log(mongoURI)
mongoose.set('useUnifiedTopology', true)
mongoose
  .connect(
    mongoURI,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))


var Users = require('./routes/Users')

app.use('/users', Users) 
app.use("/", indexRouter)
app.use("/api/stocks", stocksRouter)

module.exports = app