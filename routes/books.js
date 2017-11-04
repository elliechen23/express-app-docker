var express = require('express');
var router = express.Router();
var Book;
//==== 連線到mongodb ====
//請先確定mongodb有啟動  mongod --dbpath d:\data\db
var mongoose = require('mongoose');
//在local端debug使用
//mongoose.connect('mongodb://localhost/BookDb');
//docker使用
mongoose.connect("mongodb://mongo/BooksDb");
var db = mongoose.connection;
db.on('error',function(err){
  console.log(err.name + ":" + err.message);
})
db.once('open',function(){
  console.log('BookDb連線建立成功!!');

  //定義Schema
  var Schema = mongoose.Schema;
  var BookSchema = new Schema({
    name:{type:String,required:true,unique:true},
    author:{type:String,required:true},
    price:{type:Number,min:0,max:10000}
  }); //,{ collection: 'Book' })

  //產生Model
  Book = mongoose.model('Book',BookSchema);

})
//==========================
function errorHandler(err,res){
  console.log(err.name + ":" + err.message);
  res.send(err.name + ":" + err.message);
}
//http://localhost:3000/Books
router.route('/books')
      .get(function(req,res){
        //res.json([{'name':'Jack','age':35},{'name':'Mary','age':28},{'name':'Tom','age':39}]);
        Book.find({},function(err,Books){
          if(err) return errorHandler(err,res);
          res.json(Books);
        })
      })
      .post(function(req,res){         
          var _Book =  new Book(req.body);
          _Book.save(function(err,Book){
              if(err) return errorHandler(err,res);
              console.log(Book);
              res.send('Book新增成功!!');
          })

      })
      //http://localhost:3000/Books/12
router.route('/books/:id')
      .get(function(req,res){
        //res.send('get Book' + req.params.id);
        Book.findById(req.params.id,function(err,Book){
          if(err) return errorHandler(err,res);
          res.json(Book);
        })
      })
      .put(function(req,res){
          //res.send('put Book ' + req.params.id );
          Book.findByIdAndUpdate(req.params.id,req.body,function(err,Book){
            if(err) return errorHandler(err,res);
            console.log(Book);
            res.send('Book修改成功!!');
          })
      })
      .delete(function(req,res){
         //res.send('delete Book ' + req.params.id );
         Book.findByIdAndRemove(req.params.id,function(err,Book){
          if(err) return errorHandler(err,res);
          console.log(Book);
          res.send('Book刪除成功!!');
         })
      })
module.exports = router;
