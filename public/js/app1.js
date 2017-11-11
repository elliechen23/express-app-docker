// 等候 HTML 文件完成載入
$(document).ready(function(){
    initSubmitForm();
    doSubmitForm();
  });
  //for localhost
  //var sitelink  = "http://127.0.0.1:8080";
  var apilink = "/api1/users/";
  var upd_flg = false;
  var UPD_ID="";
  //for docker ip
  var sitelink  = "http://192.168.99.100:8080";
  var initSubmitForm = function() {
      // 使用 ajax() 來呼叫 REST API
      $.ajax({
          url: sitelink + apilink,
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
              + "<button  class='btn btn-primary' type='button' onclick='upd_click(" + i + ");'><span  class='glyphicon glyphicon-pencil'></span></button>"
              + "</td><td>" 
              + "<button  class='btn btn-primary' type='button' onclick='del_click(" + i + ");'><span  class='glyphicon glyphicon-trash'></span></button>"
              + "</td>"
              +"</tr>";

          $('#user_message').append(htmlCode);
      }
  }

  
    function upd_click(rowsid){
        //Javascript 取得table 中TD的值 
        var VAL=document.getElementById("tb").rows[rowsid+1].cells[0]; 
        var ID_VAL=VAL.innerHTML;
        UPD_ID=ID_VAL;
        getFormIDValue(ID_VAL);
        upd_flg=true;
    }
    
    var getFormIDValue= function(ID_VAL) {
        // 使用 ajax() 來呼叫 REST API
        $.ajax({
            url: sitelink + apilink + ID_VAL,
            type: "GET",
            dataType: "json",
            complete: function(data, textStatus, jqXHR) {
                console.log(textStatus);
                //alert(textStatus);
            },
            success: function (data, textStatus, jqXHR) {
              console.log(data);  
              dataMapping2(data);
            }
        });
        return false;
    };

    var dataMapping2=function(data){
      var json=JSON.stringify(data);
        JSON.parse(json, function(k, v) {
          if (k=="name"){
            $("#name").val(v); 
          }
          if (k=="email"){
            $("#email").val(v);
          }
          if (k=="age"){
            $("#age").val(v);
          }
         
        });
    }

    function del_click(rowsid){
        //Javascript 取得table 中TD的值 
        var td=document.getElementById("tb").rows[rowsid+1].cells[0]; 
        var ID_VAL=td.innerHTML;
        var tr = td.parentNode; // td元素的父節點 = tr
        delFormIDValue(ID_VAL);
        tr.parentNode.removeChild(tr); //利用tr的父節點刪除tr
        upd_flg=false;
    }

    var delFormIDValue= function(ID_VAL) {
        // 使用 ajax() 來呼叫 REST API
        $.ajax({
            url: sitelink + apilink + ID_VAL,
            type: "DELETE",
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            complete: function(data, textStatus, jqXHR) {
                console.log(textStatus);
            },
            success: function (data, textStatus, jqXHR) {
              console.log(data);  
              alert(data);
            }
        });
        return false;
    };

    var doSubmitForm = function(){
        
        $("#okbtn").click(function(){
          var name=$("#name").val();
          var email=$("#email").val();
          var age=$("#age").val();
          var data='{"name":"' + name + '",' +
          '"email":"' + email + '",' + 
          '"age":' + age + '}';
          if(upd_flg==false){
            postFormIDValue(data);
          }
          else if(upd_flg=true){
            putFormIDValue(data);
          }
          upd_flg=false;
        });
    };

    var postFormIDValue= function(data) {
        // 使用 ajax() 來呼叫 REST API
        $.ajax({
            url: sitelink + apilink ,
            type: "POST",
            data: data,
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            complete: function(data, textStatus, jqXHR) {
                console.log(textStatus);
            },
            success: function (data, textStatus, jqXHR) {
              console.log(data);  
              alert(data);
            }
        });
        return false;
    };

    var putFormIDValue= function(data) {
        // 使用 ajax() 來呼叫 REST API
        $.ajax({
            url: sitelink + apilink + UPD_ID,
            type: "PUT",
            data: data,
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            complete: function(data, textStatus, jqXHR) {
                console.log(textStatus);
            },
            success: function (data, textStatus, jqXHR) {
              console.log(data); 
              alert(data); 
            }
        });
        return false;
    };
 
    