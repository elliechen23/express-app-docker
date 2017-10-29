var express = require('express');
var router = express.Router();

//http://localhost:3000/admin
router.get('/',function(req,res){
    res.send('admin 首頁');
})
//http://localhost:3000/admin/hello
router.get('/hello',function(req,res){
    res.send('Hello World!!');
    //res.json('["a","b","c"]')
})
//http://localhost:3000/admin/hello/Jack
router.get('/hello/:loginName',function(req,res){
  var name = req.params.loginName;
  res.send('Hello ' + name);
})

module.exports = router;