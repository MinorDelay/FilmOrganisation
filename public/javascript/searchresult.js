// Function to display search result
function findMovies() {
    $.get('../searchResult', function (data) {
        if (!data) {
            console.log("No data received")
        } else {
            console.log("Data received");
            showMovies(data, "searchResultTable")
        }
    });
}

window.onload = findMovies;