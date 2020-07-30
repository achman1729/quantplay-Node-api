const express = require('express')
const stock = express.Router()
const cors = require('cors')
// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')
// const saltRounds = 10

// const User = require('../models/User')
stock.use(cors())

const Equity = require('../models/Equity')

// parameter for hashing the data
process.env.SECRET_KEY = 'secret'

// route for add new stock to watchlist
stock.post('/add', (req, res) => {
  // stock data comes via form in the front end in the req.body object
  const stockData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    ticker: req.body.ticker
  }

  // Returns one document that satisfies the specified query criteria on the collection. It is an async function and that's why can be chained with .then and .catch
  // email: req.body.email is like a query to the find a record in the User model
  Equity.findOne({
    ticker: req.body.ticker,
    email: req.body.email
  })
  .then(p => {
      if (p) {
      // replace
      Equity.replaceOne({ticker: req.body.ticker, email: req.body.email}, stockData)
      
      } else { // create
          Equity.create(stockData)
          .then(r => {
              res.json({ resp: 'added ' + r })
          })
          .catch(err => {
              res.send('error: ' + err)
          })
          
      }
  })
  .catch(err => {
      res.send('error: ' + err)
  })
})


// get watchlist of this user
stock.get('/watchlist', (req, res) => {
// decoded the authorization token sent from the front end
// 
// var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
// console.log(req.headers['authorization'])

  Equity.find({
      email: req.body.email
  })
  .then(ps => {
      return res.json(ps)
  })
  .catch(err => {
    res.send('error: ' + err)
  })
})

stock.get('/stock', (req, res) => {
    // decoded the authorization token sent from the front end
    // 
    // var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
    // console.log(req.headers['authorization'])
    
    Equity.findOne({
        name: req.body.name,
        email: req.body.email
    })
    .then(p => {
        return res.json(p)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

module.exports = stock