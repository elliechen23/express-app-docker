var express = require('express');
var router = express.Router();

/* GET home page. */
//http://localhost:3000/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',users:[{'name':'Jack','age':35},{'name':'Mary','age':28},{'name':'Tom','age':39}] });
});

module.exports = router;
