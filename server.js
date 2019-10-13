var express = require('express')
var app = express();
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('data/movies.sqlite')

app.use(express.static(__dirname + '/public'))

// routes
app.get('/', function(request, response){
    response.send('Hello, World');
});

// Webpage with a table with all movies
app.get('/allmovies', function(request, response){
    console.log("GET request received at /movielist");
    db.all('SELECT * FROM movies', function(err, rows){
        if(err){
            console.log("Error: " + err)
        }
        else{
            response.send(rows);
        }
    })
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});