var express = require('express');
var router = express.Router();

const stocks = [
  {symbol: "NFLX", price: 300},
  {symbol: "GOOG", price: 900},
  {symbol: "AAPL", price: 1300}
]

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(stocks);
});

module.exports = router;
