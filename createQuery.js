module.exports = {
    createQuerySearch: function (userFilter) {
        var query = "SELECT * FROM Movies WHERE 1=1"

        if (userFilter.keywords != '') {
            query += " AND ("
            var words = userFilter.keywords.toString().split(" ");
            for (i = 0; i < words.length; i++) {
                query += "Title LIKE '%" + words[i] + "%'" + " OR Actor LIKE '%" + words[i] + "%' OR Director LIKE '%" + words[i] + "%' OR ";
            }
            query = query.slice(0, -4);
            query += ")"
        }

        if (userFilter.Rating == "< 5") query += " AND Rating <= 5";
        else if (userFilter.Rating == "5 - 7.5") query += " AND Rating BETWEEN 5 AND 7";
        else if (userFilter.Rating == "> 7.5") query += " AND Rating >= 7.5";

        if (userFilter.Price == "Cheap watch (< 5)") query += " AND Price <= 5";
        else if (userFilter.Price == "Budget (5 - 10)") query += " AND Price BETWEEN 5 AND 10";
        else if (userFilter.Price == "Medium (10 - 15)") query += " AND Price BETWEEN 10.00 AND 15";
        else if (userFilter.Price == "Expensive taste (> 15)") query += " AND Price >= 15 ";

        if (userFilter.Mood != '') query += " AND Mood = '" + userFilter.Mood + "'";

        if (userFilter.Genre != '') query += " AND Genre = '" + userFilter.Genre + "'";

        if (userFilter.Length == "< 30 minutes") query += " AND Length <= 30";
        else if (userFilter.Length == "30 - 90 minutes") query += " AND Length BETWEEN 30 AND 90";
        else if (userFilter.Length == "> 90 minutes") query += " AND Length >= 90";

        return query
    },

    createQueryLink: function (link) {
        var query = "SELECT * FROM Movies WHERE ";
        var split = link.split("=");
        query += split[0] + " = '" + split[1] + "'";
        return query
    }
}