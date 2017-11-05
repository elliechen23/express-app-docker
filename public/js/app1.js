// 等候 HTML 文件完成載入
$(document).ready(function(){
    initSubmitForm();
  });
  //for localhost
  //var sitelink  = "http://127.0.0.1:8080";
  //for docker ip
  var sitelink  = "http://192.168.99.100:8080";
  var initSubmitForm = function() {
      // 使用 ajax() 來呼叫 REST API
      $.ajax({
          url: sitelink + '/api1/users',
          type: "GET",
          dataType: "json",
          complete: function(data, textStatus, jqXHR) {
              console.log(textStatus);
          },
          success: function (data, textStatus, jqXHR) {
            console.log(data);    
            dataMapping(data);
          }
      });
      
      return false;
  };

  var dataMapping = function(data) {
      for (i = 0; i < data.length; i++) {
          var htmlCode = 
               "<tr>"
              + "<td>" + data[i]._id + "</td>"
              + "<td>" + data[i].name + "</td>"
              + "<td>" + data[i].email + "</td>"
              + "<td>" + data[i].age + "</td>"
              + "<td>" 
              + '<button  class="btn btn-primary" type="button"><span  class="glyphicon glyphicon-pencil"></span></button>' 
              + "</td><td>" 
              + '<button  class="btn btn-primary" type="button"><span  class="glyphicon glyphicon-trash"></span></button>' 
              + "</td>"
              +"</tr>";

          $('#user_message').append(htmlCode);
      }
  }