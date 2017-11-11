var express = require('express');
var router = express.Router();

/* GET home page. */
//http://localhost:3000/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Microservice Demo',users:[{'name':'Jack','age':35,'email':'Jack@gmail.com'},{'name':'Mary','age':28,'email':'Mary@gmail.com'},{'name':'Tom','age':39,'email':'Tom@gmail.com'}] });
});

module.exports = router;
