function  addRanking(username, level, gender) {
    var userData = JSON.parse(sessionStorage.getItem('currentUser'));
    const kinveyAuthHeaders = {'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')};
var rankingObjects;
    $.ajax({
        type: "GET",
        url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/" + "ranking",
        headers: kinveyAuthHeaders,
        async: false,
        success: rankingSuccess,
        error: handleAjaxError
    });

    function rankingSuccess(data) {
        rankingObjects = data;
    }
    let first;
    let second;
    let third;
    let isInside = false;
    for(let obj of rankingObjects) {
        if (obj._id == username) {
            isInside = true;
            first = obj.first;
            second = obj.second;
            third = obj.third;
        }
    }
    if(isInside == true) {
        $.ajax({
            type: "PUT",
            url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/" + "ranking/" + username,
            headers: kinveyAuthHeaders,
            async: false,
            data: {
                lvl: level,
                gender: gender,
                first: first,
                second :second,
                third : third
            },
            error: handleAjaxError
        });
    }
    else {
        $.ajax({
            type: "POST",
            url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/" + "ranking",
            headers: kinveyAuthHeaders,
            async: false,
            data: {
                _id: username,
                lvl: level,
                gender: gender,
                first: "false",
                second :"false",
                third : "false"
            },
            error: handleAjaxError
        });
    }
}


    function rankingTable() {
        const kinveyRankUrl = kinveyBaseUrl + "appdata/" + kinveyAppKey + "/ranking/";
        const kinveyAuthHeaders = {'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')};

        var userData = JSON.parse(sessionStorage.getItem('currentUser'));

        var numberUsers;
        var userObjects;
        $.ajax({
            type: "GET",
            url: kinveyRankUrl,
            headers: kinveyAuthHeaders,
            async: false,
            success: function (ranking) {
                numberUsers = ranking.length;
                userObjects = ranking;
            }
        });
        userObjects.sort(function(a, b) {
            return b.lvl - a.lvl;
        });
        for (var j = 1; j <= numberUsers; j++) {
            var gender = userObjects[j - 1].gender;// "gender"
            var username = userObjects[j - 1]._id;// "username"
            var lvl = userObjects[j - 1].lvl;// "level"
            document.write('<tr> <td>' + j + '</td> <td>' + gender + '</td> <td>'
                + username + '</td> <td>' + Math.floor(Number(lvl)) + '</td> </tr>');
        }

        if(userData.username == userObjects[0]._id) {
            $.ajax({
                type: "PUT",
                url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/" + "ranking/" + userObjects[0]._id,
                headers: kinveyAuthHeaders,
                async: false,
                data: {
                    gender: userData.gender,
                    lvl: userData.level,
                    first: "true",
                    second: userObjects[0].second,
                    third: userObjects[0].third
                },
                error: handleAjaxError
            });
        }
        else if(userData.username == userObjects[1]._id) {
            $.ajax({
                type: "PUT",
                url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/" + "ranking/" + userObjects[1]._id,
                headers: kinveyAuthHeaders,
                async: false,
                data: {
                    gender: userData.gender,
                    lvl: userData.level,
                    first: userObjects[1].first,
                    second: "true",
                    third: userObjects[1].third
                },
                error: handleAjaxError
            });
        }
        else if(userData.username == userObjects[2]._id) {
            $.ajax({
                type: "PUT",
                url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/" + "ranking/" + userObjects[2]._id,
                headers: kinveyAuthHeaders,
                async: false,
                data: {
                    gender: userData.gender,
                    lvl: userData.level,
                    first: userObjects[2].first,
                    second: userObjects[2].second,
                    third: "true"
                },
                error: handleAjaxError
            });
        }


    }