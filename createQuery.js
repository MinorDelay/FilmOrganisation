module.exports = {
    createQuerySearch: function (userFilter) {
        var query = "SELECT * FROM Movies WHERE 1=1"

        if (userFilter.keywords != '') {
            query += " AND ("
            var words = userFilter.keywords.toString().split(" ");
            for (i = 0; i < words.length; i++) {
                query += "Title LIKE '%" + words[i] + "%' OR Summary LIKE '%" + words[i] + "%' OR Actor LIKE '%" + words[i] + "%' OR Director LIKE '%" + words[i] + "%' OR ";
            }
            query = query.slice(0, -4);
            query += ")"
        }

        if (userFilter.imdbRating == "< 5") query += " AND ImdbRating <= 5";
        else if (userFilter.imdbRating == "5 - 7.5") query += " AND ImdbRating BETWEEN 5 AND 7";
        else if (userFilter.imdbRating == "> 7.5") query += " AND ImdbRating >= 7.5";

        if (userFilter.price == "Cheap watch (< 5)") query += " AND Price <= 5";
        else if (userFilter.price == "Budget (5 - 10)") query += " AND Price BETWEEN 5 AND 10";
        else if (userFilter.price == "Medium (10 - 15)") query += " AND Price BETWEEN 10.00 AND 15";
        else if (userFilter.price == "Expensive taste (> 15)") query += " AND Price >= 15 ";

        if (userFilter.mood != '') query += " AND Mood = '" + userFilter.mood + "'";

        if (userFilter.genre != '') query += " AND Genre = '" + userFilter.genre + "'";

        if (userFilter.length == "< 30 minutes") query += " AND Length <= 30";
        else if (userFilter.length == "30 - 90 minutes") query += " AND Length BETWEEN 30 AND 90";
        else if (userFilter.length == "> 90 minutes") query += " AND Length >= 90";

        return query
    },

    createQueryLink: function (link) {
        var query = "SELECT * FROM movies WHERE ";
        var split = link.split("=");
        query += split[0] + " = '" + split[1] + "'";
        return query
    }
}