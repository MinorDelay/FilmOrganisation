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
    var movie = data[0]
    var nextMovie = {
        "title": "????????"
    }
    var mergedMovie = {};

    // Each entry in database
    for (var i = 0; i < Object.keys(data).length; i++) {
        var row = table.insertRow();

        // Movie with merged data from all movies with the same title
        if (movie.title != nextMovie.title) {
            mergedMovie = {
                "title": data[i].title,
                "genre": data[i].genre,
                "summary": data[i].summary,
                "length": data[i].length,
                "price": data[i].price,
                "imdbRating": data[i].imdbRating,
                "actor": data[i].actor,
                "director": data[i].director,
                "mood": data[i].mood
            }
        }

        // Current movie
        movie = data[i]

        // Next movie if there is a next movie in the list
        if (i + 1 < Object.keys(data).length) nextMovie = data[i + 1]
        else nextMovie = {
            "title": "????????"
        }

        // Merge genre, actors and directors into one string
        if (movie.title == nextMovie.title) {
            if (mergedMovie.genre.indexOf(nextMovie.genre) < 0) mergedMovie.genre += " | " + nextMovie.genre
            if (mergedMovie.actor.indexOf(nextMovie.actor) < 0) mergedMovie.actor += " | " + nextMovie.actor
            if (mergedMovie.director.indexOf(nextMovie.director) < 0) mergedMovie.director += " | " + nextMovie.director
        }

        // Create row if the next movie is another movie
        if (movie.title != nextMovie.title) {
            for (var j = 0; j < Object.keys(mergedMovie).length; j++) {
                var cell = document.createElement('td');
                var text = mergedMovie[attributes[j]].toString();

                // Create url's
                if (["genre", "length", "price", "imdbRating", "actor", "director", "mood"].indexOf(attributes[j]) > -1)
                    text = text.link("/pageLinking")
                cell.innerHTML = text;
                row.appendChild(cell);
            }
        }
    }
}

function showMovies(movies, tableId) {
    var table = document.getElementById(tableId);
    var tableHeadTitles = ["Title", "Genre", "Summary", "Length", "Price", "Rating", "Actor", "Director", "Mood"]
    var movieAttributes = ["title", "genre", "summary", "length", "price", "imdbRating", "actor", "director", "mood"]
    createTable(table, movies, movieAttributes);
    createTableHead(table, tableHeadTitles);
}