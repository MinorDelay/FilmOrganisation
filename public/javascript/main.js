// var selectedMood;
// var selectedRating;

// function setMood(selection) {
//     selectedMood = selection.value;
// }

// function setRating(selection) {
//     selectedRating = selection.value;
// }

// Handle database
function showMovies(movies) {
    // Get HTML element
    var moviesSection = document.getElementById('moviesSection');

    // Create table
    var table = $('<table>').addClass('moviesTable');

    // Column Titles
    var columnTitles = ["Title", "Genre", "Summary", "Lenght", "Price", "Rating", "Actor", "Director", "Mood"]

    var row = $('<tr>').addClass('rowHead');
    for (var i = 0; i < columnTitles.length; i++) {
        var column = $('<th>').addClass('columnHead').text(columnTitles[i]);
        row.append(column);
    }
    table.append(row);

    // Row
    var movieAttributes = ["title", "genre", "summary", "length", "price", "imdbRating", "actor", "director", "mood"]
    for (var i = 0; i < Object.keys(movies).length; i++) {
        // Column
        var movieRow = movies[i]
        var row = $('<tr>').addClass('row');
        for (var j = 0; j < movieAttributes.length; j++) {
            var newIndex = 2+j;
            var column = $('<td>').addClass('column').text(movieRow[movieAttributes[j]]);
            console.log(movieRow[movieAttributes[j]])
            row.append(column);
        }
        table.append(row);
    }
    $('#moviesSection').append(table);
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