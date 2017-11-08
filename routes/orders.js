var express = require('express');
var router = express.Router();
var Order;
//==== 連線到mongodb ====
//請先確定mongodb有啟動  mongod --dbpath d:\data\db
var mongoose = require('mongoose');
//在local端debug使用
//mongoose.connect('mongodb://localhost/OrderDb');
//docker使用
mongoose.connect("mongodb://mongo/OrderDb");
var db = mongoose.connection;
db.on('error',function(err){
  console.log(err.name + ":" + err.message);
})
db.once('open',function(){
  console.log('OrderDb連線建立成功!!');

  //定義Schema
  var Schema = mongoose.Schema;
  var OrderSchema = new Schema({
    name:{type:String,required:true,unique:true},
    orderer:{type:String,required:true},
    quantity:{type:Number,min:1,max:100},
    price:{type:Number,min:1,max:10000},
    totalamount:{type:Number,min:1,max:1000000}
  }); //,{ collection: 'Order' })

  //產生Model
  Order = mongoose.model('Order',OrderSchema);

})
//==========================
function errorHandler(err,res){
  console.log(err.name + ":" + err.message);
  res.send(err.name + ":" + err.message);
}
//http://localhost:8080/Orders
router.route('/Orders')
      .get(function(req,res){
        //res.json([{'name':'Jack','age':35},{'name':'Mary','age':28},{'name':'Tom','age':39}]);
        Order.find({},function(err,Orders){
          if(err) return errorHandler(err,res);
          res.json(Orders);
        })
      })
      .post(function(req,res){         
          var _Order =  new Order(req.body);
          _Order.save(function(err,Order){
              if(err) return errorHandler(err,res);
              console.log(Order);
              res.send('Order新增成功!!');
          })

      })
      //http://localhost:8080/Orders/12
router.route('/Orders/:id')
      .get(function(req,res){
        //res.send('get Order' + req.params.id);
        Order.findById(req.params.id,function(err,Order){
          if(err) return errorHandler(err,res);
          res.json(Order);
        })
      })
      .put(function(req,res){
          //res.send('put Order ' + req.params.id );
          Order.findByIdAndUpdate(req.params.id,req.body,function(err,Order){
            if(err) return errorHandler(err,res);
            console.log(Order);
            res.send('Order修改成功!!');
          })
      })
      .delete(function(req,res){
         //res.send('delete Order ' + req.params.id );
         Order.findByIdAndRemove(req.params.id,function(err,Order){
          if(err) return errorHandler(err,res);
          console.log(Order);
          res.send('Order刪除成功!!');
         })
      })
module.exports = router;
