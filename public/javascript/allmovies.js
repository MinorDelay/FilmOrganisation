function getMovies() {

    $.get('../allmovies', function (data) {
        if (!data) {
            console.log("No data received")
        } else {
            console.log("Data received");
            // for (var i = 0; i < data.length; i++) {
            //     console.log(data[i].title);
            // }
            showMovies(data, "moviesTable")
        }
    });
}

window.onload = getMovies;