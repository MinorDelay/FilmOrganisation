// Function to display search result
function findMovies() {
    $.get('../searchResult', function (data) {
        if (!data[0]) {
            console.log("No data received")
        } else {
            console.log("Data received");
            showMovies(data[0], "searchResultTable")
            console.log(data[1])
            for (var property in data[1]) {
                if (data[1][property] != '') {
                    document.getElementById("searchcriteria").innerHTML += property + ": " + data[1][property] + "<br/>"
                }
            }
        }
    })
}

window.onload = findMovies;