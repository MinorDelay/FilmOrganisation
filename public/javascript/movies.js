// Create table head
function createTableHead(table, titles) {
    var thead = table.createTHead();
    var row = thead.insertRow();
    for (var i = 0; i < Object.keys(titles).length; i++) {
        var th = document.createElement("th");
        var text = document.createTextNode(titles[i]);
        th.appendChild(text);
        row.appendChild(th);
    }
}

// Create table body
function createTable(table, data, attributes) {
    for (var i = 0; i < Object.keys(data).length; i++) {
        var row = table.insertRow();
        for (var j = 0; j < attributes.length; j++) {
            var cell = row.insertCell();
            var text = document.createTextNode(data[i][attributes[j]]);
            cell.appendChild(text);
        }
    }
}

function showMovies(movies) {
    var table = document.getElementById('moviesTable');
    var tableHeadTitles = ["Title", "Genre", "Summary", "Lenght", "Price", "Rating", "Actor", "Director", "Mood"]
    var movieAttributes = ["title", "genre", "summary", "length", "price", "imdbRating", "actor", "director", "mood"]
    createTable(table, movies, movieAttributes);
    createTableHead(table, tableHeadTitles);
}

function getMovies() {

    $.get('../allmovies', function (data) {
        if (!data) {
            console.log("No data received")
        } else {
            console.log("Data received");
            // for (var i = 0; i < data.length; i++) {
            //     console.log(data[i].title);
            // }
        }
        showMovies(data)
    });
}

window.onload = getMovies;