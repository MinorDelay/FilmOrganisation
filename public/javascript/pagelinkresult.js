// Function to display search result
function findMovies() {
    $.get('../pageLinkResult', function (data) {
        if (!data[0]) {
            console.log("No data received")
        } else {
            console.log("Data received");
            console.log(data[0])
            showMovies(data[0], "pageLinkTable")
            var dataString = data[1].toString().split("=");
            document.getElementById("linkCriteria").innerHTML = dataString[0] + ": " + dataString[1]
        }
    });
}

window.onload = findMovies;