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

var userFilter;

// Process filter chosen by user
app.post('/search', function (request, response) {
    console.log("POST request received at /search");
    console.log(request.body)
    userFilter = request.body;
    response.redirect('/searchresult.html');
});

// Find movies based on filter
app.get('/searchResult', function (request, response) {
    console.log("GET request received at /searchResult");

    // Create query dynamically
    var sqlQuery = "SELECT * FROM movies WHERE 1=1"

    if (userFilter.title != '') sqlQuery += " AND title LIKE '%" + userFilter.title + "%'";

    if (userFilter.imdbRating == "< 5") sqlQuery += " AND imdbRating <= 5";
    else if (userFilter.imdbRating == "5 - 7.5") sqlQuery += " AND imdbRating BETWEEN 5 AND 7";
    else if (userFilter.imdbRating == "> 7.5") sqlQuery += " AND imdbRating >= 7.5";

    if (userFilter.price == "Cheap watch (< 5)") sqlQuery += " AND price < 5";
    else if (userFilter.price == "Budget (5 - 10)") sqlQuery += " AND price BETWEEN 5 AND 10";
    else if (userFilter.price == "Medium (10 - 15)") sqlQuery += " AND price BETWEEN 10.00 AND 15";
    else if (userFilter.price == "Expensive taste (> 15)") sqlQuery += " AND price >= 15 ";

    if (userFilter.mood != '') sqlQuery += " AND mood = '" + userFilter.mood + "'";

    if (userFilter.genre != '') sqlQuery += " AND genre = '" + userFilter.genre + "'";

    if (userFilter.length == "< 30 minutes") sqlQuery += " AND length <= 30";
    else if (userFilter.length == "30 - 90 minutes") sqlQuery += " AND length BETWEEN 30 AND 90";
    else if (userFilter.length == "> 90 minutes") sqlQuery += " AND length >= 90";

    console.log(sqlQuery)

    // Return query result
    db.all(sqlQuery, function (err, rows) {
        if (err) {
            console.log("Error: " + err)
        } else {
            response.send(rows);
            console.log(rows)
        }
    })
});

app.listen(3000, function () {
    console.log("Server is running on port 3000");
});