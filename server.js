var express = require('express')
var app = express();
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('data/movies.sqlite')
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({extended: true})); 

// routes
app.get('/', function (request, response) {
    response.send('Hello, World');
});

// Webpage with a table with all movies
app.get('/allmovies', function (request, response) {
    console.log("GET request received at /movielist");
    db.all('SELECT * FROM movies', function (err, rows) {
        if (err) {
            console.log("Error: " + err)
        } else {
            response.send(rows);
        }
    })
});

app.post('/search', function (request, response) {
    console.log(request.body)

    console.log("POST request received at /search");
    // var sqlQuery = "SELECT * FROM movies WHERE 1=1 AND imdbRating > 7"
    // db.each(sqlQuery, [], (err, rows) => {
    //     if (err) {
    //         throw err;
    //     }
    //     response.send(rows);
    // });
});

app.listen(3000, function () {
    console.log("Server is running on port 3000");
});