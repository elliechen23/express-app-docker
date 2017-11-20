'use strict';
var srve = angular.module('bsService',[]);

function myService($http){
    var self = this;
    var site = "http://192.168.99.100:8080/";
    var ap = {'1':'api1/users','2':'api2/books','3':'api3/orders'};

    // list all data
    self.listData = function(api){
        return $http({method:"GET",url:site+ap[api]});
    };

    // insert, update, fetch data
    self.handleData = function(api,action,dataSet){
        var id = dataSet.id || "";
        var url = site+ap[api];
        if(action != "POST"){
            url += "/"+id;
            // modified dataSet
            delete dataSet['_id'];
            delete dataSet['__v'];
        }
        delete dataSet['id'];
        console.log("service:"+url);
        console.log(dataSet);
        return $http({
            method:action,
            url:url,
            data:dataSet
        });
    };
}
srve.service({'bsService':myService});
myService.$inject = ["$http"];