var https = require('http');

/**
* HOW TO Make an HTTP Call - GET
*/
// options for GET
var optionsget = {
   host : 'localhost', // here only the domain name
   // (no http/https !)
   port : 8080,
   path : '/api/users', // the rest of the url with parameters if needed
   method : 'GET' // do GET
};

console.info('Options prepared:');
console.info(optionsget);
console.info('Do the GET call');

// do the GET request
var reqGet = https.request(optionsget, function(res) {
   console.log("statusCode: ", res.statusCode);
   // uncomment it for header details
//  console.log("headers: ", res.headers);


   res.on('data', function(d) {
       console.info('GET result:\n');
       process.stdout.write(d);
       console.info('\n\nCall completed');
   });

});

reqGet.end();
reqGet.on('error', function(e) {
   console.error(e);
});


/**
 * HOW TO Make an HTTP Call - DELETE
 */
// do a DELETE request
 
// the post options
var optionspost = {
    host : 'localhost',
    port : 8080,
    path : '/api/users/59fd79af53f6890fc17622c1',
    method : 'DELETE'
};
 
console.info('Options prepared:');
console.info(optionspost);
console.info('Do the DELETE call');
 
// do the DELETE call
var reqPost = https.request(optionspost, function(res) {
    console.log("statusCode: ", res.statusCode);
    // uncomment it for header details
//  console.log("headers: ", res.headers);
 
    res.on('data', function(d) {
        console.info('DELETE result:\n');
        process.stdout.write(d);
        console.info('\n\nDELETE completed');
    });
});
 
// write the json data
//reqPost.write(jsonObject);
reqPost.end();
reqPost.on('error', function(e) {
    console.error(e);
});

/**
 * HOW TO Make an HTTP Call - POST
 */
// do a POST request
// create the JSON object
jsonObject = JSON.stringify({
    "name" : "Mary2",
    "email" : "Mary2@gmail.com",
    "age" : 20
});
 
// prepare the header
var postheaders = {
    'Content-Type' : 'application/json',
    'Content-Length' : Buffer.byteLength(jsonObject, 'utf8')
};
 
// the post options
var optionspost = {
    host : 'localhost',
    port : 8080,
    path : '/api/users',
    method : 'POST',
    headers : postheaders
};
 
console.info('Options prepared:');
console.info(optionspost);
console.info('Do the POST call');
 
// do the POST call
var reqPost = https.request(optionspost, function(res) {
    console.log("statusCode: ", res.statusCode);
    // uncomment it for header details
//  console.log("headers: ", res.headers);
 
    res.on('data', function(d) {
        console.info('POST result:\n');
        process.stdout.write(d);
        console.info('\n\nPOST completed');
    });
});
 
// write the json data
reqPost.write(jsonObject);
reqPost.end();
reqPost.on('error', function(e) {
    console.error(e);
});

/**
 * HOW TO Make an HTTP Call - PUT
 */
// do a PUT request
// create the JSON object
jsonObject = JSON.stringify({
    "name" : "Tom2",
    "email" : "Tom2@gmail.com",
    "age" : 32
});
 
// prepare the header
var postheaders = {
    'Content-Type' : 'application/json',
    'Content-Length' : Buffer.byteLength(jsonObject, 'utf8')
};
 
// the post options
var optionspost = {
    host : 'localhost',
    port : 8080,
    path : '/api/users/59fd69062d02ee090678a3b9',
    method : 'PUT',
    headers : postheaders
};
 
console.info('Options prepared:');
console.info(optionspost);
console.info('Do the PUT call');
 
// do the POST call
var reqPost = https.request(optionspost, function(res) {
    console.log("statusCode: ", res.statusCode);
    // uncomment it for header details
//  console.log("headers: ", res.headers);
 
    res.on('data', function(d) {
        console.info('PUT result:\n');
        process.stdout.write(d);
        console.info('\n\nPUT completed');
    });
});
 
// write the json data
reqPost.write(jsonObject);
reqPost.end();
reqPost.on('error', function(e) {
    console.error(e);
});

//node client.js

