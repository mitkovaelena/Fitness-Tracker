function addActivityLog(username, time, kg, km) {
    let userData = JSON.parse(sessionStorage.getItem('currentUser'));
    const kinveyAuthHeaders = {'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')};

    let newDate = new Date();
    let date = newDate.toLocaleDateString("de-DE");
    let hour = newDate.toLocaleTimeString("de-DE");

        $.ajax({
            type: "POST",
            url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/" + "activityLog",
            headers: kinveyAuthHeaders,
            async: false,
            data: {
                username: username,
                date: date,
                hour: hour,
                time: time,
                kg: kg,
                km: km
            },
            error: handleAjaxError
        });
}

function activityLogTable() {
    const kinveyActivityLogUrl = kinveyBaseUrl + "appdata/" + kinveyAppKey + "/activityLog/";
    const kinveyAuthHeaders = {'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')};
    let userData = JSON.parse(sessionStorage.getItem('currentUser'));

    let userObjects;
    $.ajax({
        type: "GET",
        url: kinveyActivityLogUrl,
        headers: kinveyAuthHeaders,
        async: false,
        success: function (activityLog) {
            userObjects = activityLog;
        }
    });

    let userActivity = [];
    for(let obj of userObjects){
        if(obj.username == userData.username) userActivity.push(obj);
    }

    for (var j = 1; j <= userActivity.length; j++) {
        let date = userActivity[j - 1].date;
        let hour = userActivity[j - 1].hour;
        let time = userActivity[j - 1].time;
        let kg = userActivity[j - 1].kg;
        let km = userActivity[j - 1].km;
        document.write('<tr> <td>' + date + '</td> <td>' + hour + '</td> <td>'
            + time + '</td> <td>' + kg + '</td> <td>' + km + '</td></tr>');
    }

}