var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var cors = require("cors")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

var indexRouter = require("./routes/index")
var stocksRouter = require("./routes/stock")

var app = express()

app.use(cors())
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  )

//   setting the Mongo database
// const mongoURI = 'mongodb://localhost:27017/userlogindb'
const mongoURI = 'mongodb+srv://user-auth:cJS11mm5Wnot6mYf@cluster0.izu4g.mongodb.net/userlogindb?retryWrites=true&w=majority'

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