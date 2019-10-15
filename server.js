var express = require('express')
var app = express();
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('data/movies.sqlite')
var bodyParser = require('body-parser');
var createQuery = require('./createQuery.js');

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({
    extended: true
}));


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

//////////////////////////// Search movies from home page ////////////////////////////
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
    var sqlQuery = createQuery.createQuerySearch(userFilter)
    console.log(sqlQuery)

    // Return query result
    db.all(sqlQuery, function (err, rows) {
        if (err) {
            console.log("Error: " + err)
        } else {
            response.send([rows, userFilter]);
        }
    })
});

//////////////////////////// Search movies from by indirect search ////////////////////////////
var characteristic;

app.get('/pageLink/:id', function (request, response) {
    characteristic = request.params.id
    console.log(characteristic)
    response.redirect('/pagelinkresult.html');
});

app.get('/pageLinkResult', function (request, response) {
    var sqlQuery = createQuery.createQueryLink(characteristic)
    console.log(sqlQuery)

     // Return query result
     db.all(sqlQuery, function (err, rows) {
        if (err) {
            console.log("Error: " + err)
        } else {
            response.send([rows, characteristic]);
        }
    })
});


//////////////////////////// General functionality ////////////////////////////
app.listen(3000, function () {
    console.log("Server is running on port 3000");
});
