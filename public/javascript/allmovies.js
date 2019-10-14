// Function to display all movies from database
function getMovies() {

    $.get('../allmovies', function (data) {
        if (!data) {
            console.log("No data received")
        } else {
            console.log("Data received");
            showMovies(data, "moviesTable")
        }
    });
}

window.onload = getMovies;