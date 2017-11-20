'use strict';
var ctrl = angular.module('bsCtrl', []);

function mngCtrl($scope, $window, $timeout, bsService, SweetAlert) {
    var self = this;
    var currentAp = {
        '1': 'users',
        '2': 'books',
        '3': 'Orders'
    };
    self.app = {};
    self.users = {};
    self.books = {};
    self.orders = {};
    self.errMsg = "";
    self.listView = function (api) {
        bsService.listData(api)
            .then(
                function (response) {
                    self[currentAp[api]] = response.data;
                    angular.forEach(response.data, function (value, key) {
                        self[currentAp[api]][key]["id"] = value["_id"];

                    });

                    // console.log(response);
                },
                function (response) {
                    console.log(response);
                    self.errMsg = "服務忙碌中，請稍候 ...";
                });
    };


    self.fetchData = function (DataSet) {
        self.opModal('show');
        self.app = DataSet;
        self.app.id = DataSet['_id'];
        console.log(self.app);
    };
    self.saveData = function (isNew) {
        var dataSet = self.app;
        var action = isNew ? "POST" : "PUT";
        var msg = isNew ? "新增" : "修改";
        bsService.handleData(item, action, dataSet)
            .then(
                function (response) {
                    console.log(response);
                    self.opModal('hide');
                    SweetAlert.swal(msg+"成功", " ", "success");
                },
                function (response) {

                    self.errMsg = "服務忙碌中，請稍候 ...";
                })
            .then(function () {
                self.opModal('hide');
                self.listView(item);
            })
    };
    self.delData = function (listData) {
        var dataSet = listData;
        console.log(listData);
        SweetAlert.swal({
            title: "Are you sure?",
            text: "Your will not be able to recover this data !",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it !",
            cancelButtonText: "No, Cancel !",
            closeOnConfirm: false,
            closeOnCancel: true
        }, function (isConfirm) {
            if (isConfirm) {
                bsService.handleData(item, "DELETE", dataSet)
                    .then(
                        function (response) {
                            console.log(response);
                            self.opModal('hide');
                            SweetAlert.swal("刪除成功 !", " ", "success");

                        },
                        function (response) {
                            self.errMsg = "服務忙碌中，請稍候 ...";
                        })
                    .then(function () {
                        self.opModal('hide');
                        self.listView(item);
                    });

            }

        });

    };
    self.opModal = function (op) {
        self.app = {};
        var currentView = "";
        console.log(currentAp[item]);
        currentView = "#" + currentAp[item] + "Modal";
        console.log(currentView);
        $(currentView).modal(op);
    };

    self.totalAmount = function(obj){
        self.app.totalamount = obj.price * obj.quantity;
    }

    // item is global varaiable
    self.listView(item);
}

ctrl.controller({
    'bsCtrl': mngCtrl
});
mngCtrl.$inject = (['$scope', '$window', '$timeout', 'bsService', 'SweetAlert']);