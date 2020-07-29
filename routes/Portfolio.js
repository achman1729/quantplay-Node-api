const express = require('express')
const portf = express.Router()
const cors = require('cors')
// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')
// const saltRounds = 10

// const User = require('../models/User')
portf.use(cors())

const Portf = require('../models/Portfolio')

// parameter for hashing the data
process.env.SECRET_KEY = 'secret'

// route for create new portfolio
portf.post('/build', (req, res) => {
  const today = new Date()
  // portfolio data comes via form in the front end in the req.body object
  const portfData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    name: req.body.name,
    description: req.body.description,
    begin: req.body.begin,
    cash: req.body.cash,
    benchmark: req.body.benchmark

  }

  // Returns one document that satisfies the specified query criteria on the collection. It is an async function and that's why can be chained with .then and .catch
  // email: req.body.email is like a query to the find a record in the User model
  Portf.findOne({
    name: req.body.name,
    email: req.body.email
  })
    .then(p => {
        if (p) {
        // replace
        Portf.replaceOne({name: req.body.name, email: req.body.email}, portfData)
        
        } else { // create
            Portf.create(portfData)
            .then(r => {
                res.json({ resp: 'created new portfolio ' + r })
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



portf.get('/ps', (req, res) => {
// decoded the authorization token sent from the front end
// 
// var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
// console.log(req.headers['authorization'])

    Portf.find({
        email: req.body.email
    })
    .then(ps => {
        return res.json(ps)
    })
    .catch(err => {
    res.send('error: ' + err)
    })
})
module.exports = portf