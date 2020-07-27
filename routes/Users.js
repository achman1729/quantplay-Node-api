const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10

const User = require('../models/User')
users.use(cors())

// parameter for hashing the data
process.env.SECRET_KEY = 'secret'

// route for registering a new user
users.post('/register', (req, res) => {
  const today = new Date()
  // user data comes via form in the front end in the req.body object
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    created: today
  }

  // Returns one document that satisfies the specified query criteria on the collection. It is an async function and that's why can be chained with .then and .catch
  // email: req.body.email is like a query to the find a record in the User model
  User.findOne({
    email: req.body.email
  })
    .then(user => {
        if (!user) {
        // auto-gen a salt and hash
        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
            userData.password = hash
            // creates a user
            User.create(userData)
            .then(user => {
                res.json({ status: user.email + 'Registered!' })
            })
            .catch(err => {
                res.send('error: ' + err)
            })
        })
        } else {
        res.json({ error: 'User already exists' })
        }
    })
    .catch(err => {
        res.send('error: ' + err)
    })
})

// route for user login
users.post('/login', (req, res) => {
    // retrieves email sent from the form in the front end in the req.body object
    User.findOne({
      email: req.body.email
    })
    .then(user => {
    if (user) {
        // compare the plain password(req.body.password) and hash password(user.password) and returns true on match
        // compareSnyc is an asynchronous function
        if (bcrypt.compareSync(req.body.password, user.password)) {
        // Passwords match
        const payload = {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
        }
        // Generating a hash token and will be sent to the front end
        // decoded in the front end with jwt.decode
        let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 1440
        })
        // sends the token to the result
        res.send(token)
        } else {
        // Passwords mismatch
        res.json({ error: 'Wrong password' })
        }
    } else {
        res.json({ error: 'User does not exist' })
    }
    })
    .catch(err => {
    res.send('error: ' + err)
    })
})

users.get('/profile', (req, res) => {
// decoded the authorization token sent from the front end
// 
var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
console.log(req.headers['authorization'])
// searching the DB by id
User.findOne({
    _id: decoded._id
})
    .then(user => {
    if (user) {
        res.json(user)
    } else {
        res.send('User does not exist')
    }
    })
    .catch(err => {
    res.send('error: ' + err)
    })
})
module.exports = users