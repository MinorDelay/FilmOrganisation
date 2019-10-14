// Create query

console.log(window.location.search)

var sqlQuery = "SELECT * FROM movies WHERE 1=1 AND imdbRating > 7"

function setTitle() {

}

function setRating(selection) {
    if (selection == "< 5") sqlQuery += "AND imdbRating <= 5";
    else if (selection == "5 - 7") sqlQuery += "AND imdbRating >= 5 AND imdbRating <= 7";
    else if (selection == "> 7.5") sqlQuery += "AND imdbRating >= 7.5";
}

function setPrice(selection) {
    if (selection == "Cheap watch (< 5)") sqlQuery += "AND price <= 5";
    else if (selection == "Budget (5 - 10)") sqlQuery += "AND price >= 5 AND price <= 10";
    else if (selection == "Medium (10.01 - 15)") sqlQuery += "AND price > 10.00 AND price <= 15";
    else if (selection == "Expensive (> 15)") sqlQuery += "AND imdbRating >= 15";
}

function setMood(selection) {
    if (selection) sqlQuery += "AND mood = " + selection.value;
    // else str.replace("????????", "replacement");
}

function setGenre(selection) {
    if (selection) sqlQuery += "AND genre = " + selection.value;
}

function setLength(selection) {
    if (selection == "< 90 minutes") sqlQuery += "AND length <= 90";
    else if (selection == "90 - 120 minutes") sqlQuery += "AND price >= 90 AND price <= 120";
    else if (selection == "> 120 minutes") sqlQuery += "AND price >= 120";
}

function findMovies() {

    $.get('../allmovies', function (data) {
        if (!data) {
            console.log("No data received")
        } else {
            console.log("Data received");
            // for (var i = 0; i < data.length; i++) {
            //     console.log(data[i].title);
            // }
            showMovies(data)
        }
    });


    // db.each(sqlQuery, [], (err, row) => {
    //     if (err) {
    //         throw err;
    //     }
    //     console.log(row.title);
    // });
}

//window.onload = findMovies;