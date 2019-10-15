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
        "Title": "????????"
    }
    var mergedMovie = {};
    // Each entry in database
    console.log(data)
    for (var i = 0; i < Object.keys(data).length; i++) {
        var row = table.insertRow();
        // Movie with merged data from all movies with the same title
        if (movie.Title != nextMovie.Title) {
            mergedMovie = {
                "Title": data[i].Title,
                "Genre": [data[i].Genre],
                "Summary": data[i].Summary,
                "Length": data[i].Length,
                "Price": data[i].Price,
                "Rating": data[i].Rating,
                "Actor": [data[i].Actor],
                "Director": [data[i].Director],
                "Mood": data[i].Mood
            }
        }

        // Current movie
        movie = data[i]

        // Next movie if there is a next movie in the list
        if (i + 1 < Object.keys(data).length) nextMovie = data[i + 1]
        else nextMovie = {
            "Title": "????????"
        }

        // Merge genre, actors and directors into one string
        if (movie.Title == nextMovie.Title) {
            if (mergedMovie.Genre.includes(nextMovie.Genre) == false) mergedMovie.Genre.push(nextMovie.Genre)
            if (mergedMovie.Actor.includes(nextMovie.Actor) == false) mergedMovie.Actor.push(nextMovie.Actor)
            if (mergedMovie.Director.includes(nextMovie.Director) == false) mergedMovie.Director.push(nextMovie.Director)
        }

        // Create row if the next movie is another movie
        if (movie.Title != nextMovie.Title) {
            console.log("TEST 1")
            for (var j = 0; j < Object.keys(mergedMovie).length; j++) {
                var cell = document.createElement('td');
                var text = "";

                // If it is one of these properties, then create url
                if (["Genre", "Length", "Price", "Rating", "Actor", "Director", "Mood"].indexOf(attributes[j]) > -1) {
                    if (Array.isArray(mergedMovie[attributes[j]])) {
                        mergedMovie[attributes[j]].forEach(function (element) {
                            text = element
                            text = text.link("/pageLink/" + attributes[j] + "=" + element)
                            cell.innerHTML += text + " | ";
                        });
                    } else {
                        text = mergedMovie[attributes[j]].toString();
                        text = text.link("/pageLink/" + attributes[j] + "=" + mergedMovie[attributes[j]])
                        cell.innerHTML = text
                    }
                    // Don't create url for title and summary
                } else {
                    cell.innerHTML = mergedMovie[attributes[j]].toString();
                }
                row.appendChild(cell);
            }
        }
    }
}

function showMovies(movies, tableId) {
    var table = document.getElementById(tableId);
    var movieAttributes = ["Title", "Genre", "Summary", "Length", "Price", "Rating", "Actor", "Director", "Mood"]
    createTable(table, movies, movieAttributes);
    createTableHead(table, movieAttributes);
}