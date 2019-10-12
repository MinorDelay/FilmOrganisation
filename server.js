var express = require('express')
var app = express();
var sqlite3 = require('sqlite3')

// routes
app.get('/public', function(request, response){
    response.send('Hello, World');
});

// Webpage with a table with all movies
app.get('public/movieslist', function(request, response){
    console.log("GET request received at /movielist");
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});