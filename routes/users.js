var express = require('express');
var router = express.Router();
var User;
//==== 連線到mongodb ====
//請先確定mongodb有啟動  mongod --dbpath d:\data\db
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/UserDb');
mongoose.connect("mongodb://mongo/dummy-app");
var db = mongoose.connection;
db.on('error',function(err){
  console.log(err.name + ":" + err.message);
})
db.once('open',function(){
  console.log('連線建立成功!!');

  //定義Schema
  var Schema = mongoose.Schema;
  var userSchema = new Schema({
    name:{type:String,required:true,unique:true},
    email:{type:String,required:true},
    age:{type:Number,min:20,max:100}
  }); //,{ collection: 'user' })

  //產生Model
  User = mongoose.model('User',userSchema);

})
//==========================
function errorHandler(err,res){
  console.log(err.name + ":" + err.message);
  res.send(err.name + ":" + err.message);
}
//http://localhost:3000/users
router.route('/users')
      .get(function(req,res){
        //res.json([{'name':'Jack','age':35},{'name':'Mary','age':28},{'name':'Tom','age':39}]);
        User.find({},function(err,users){
          if(err) return errorHandler(err,res);
          res.json(users);
        })
      })
      .post(function(req,res){         
          var _user =  new User(req.body);
          _user.save(function(err,user){
              if(err) return errorHandler(err,res);
              console.log(user);
              res.send('新增成功!!');
          })

      })
      //http://localhost:3000/users/12
router.route('/users/:id')
      .get(function(req,res){
        //res.send('get user' + req.params.id);
        User.findById(req.params.id,function(err,user){
          if(err) return errorHandler(err,res);
          res.json(user);
        })
      })
      .put(function(req,res){
          //res.send('put user ' + req.params.id );
          User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            if(err) return errorHandler(err,res);
            console.log(user);
            res.send('修改成功!!');
          })
      })
      .delete(function(req,res){
         //res.send('delete user ' + req.params.id );
         User.findByIdAndRemove(req.params.id,function(err,user){
          if(err) return errorHandler(err,res);
          console.log(user);
          res.send('刪除成功!!');
         })
      })
module.exports = router;
