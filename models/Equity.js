const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const EquitySchema = new Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  ticker: {
    type: String,
    required: true
  }
})

module.exports = Equity = mongoose.model('equity', EquitySchema)