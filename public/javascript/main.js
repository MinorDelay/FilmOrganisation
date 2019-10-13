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
    var moviesList = document.getElementById('moviesList');
    for (var i = 0; i < movies.length; i++) {
        var movie = document.createElement('movie');
        movie.className += 'movieList';
        var heading = document.createElement('h3');
        heading.innerHTML = movies[i].title;
        var summary = document.createElement('p');
        summary.innerHTML = movies[i].summary;
        movie.appendChild(heading);
        movie.appendChild(summary);
        moviesList.appendChild(movie)
    }
}

function getMovies() {

    $.get('../allmovies', function (data) {
        if (!data) {
            console.log("No data received")
        } else {
            console.log("Data received");
            for (var i = 0; i < data.length; i++) {
                console.log(data[i].title);
            }
        }
        showMovies(data)
    });
}

window.onload = getMovies;