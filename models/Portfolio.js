const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const PortfolioSchema = new Schema({
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
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  begin: {
    type: String,
    required: true
  },
  cash: {
    type: Number,
    required: true
  },
  benchmark: {
    type: Number
  },
  trades: [{
      date: String,
      direction: String,
      target: String,
      percentage: Number
  }]
})

module.exports = Portf = mongoose.model('portf', PortfolioSchema)