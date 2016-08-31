    function addActivity() {
    const kinveyAddUrl = kinveyBaseUrl + "user/" + kinveyAppKey + "/" + sessionStorage.getItem('id');
    const kinveyAuthHeaders = {'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')};
    var userData = JSON.parse(sessionStorage.getItem('currentUser'));

    var newTime = $('#timeAtTheGym').val();
    var newKg = $('#kg').val();
    var newKm = $('#km').val();
    var fullname = userData.fullname;
    var gender = userData.gender;
    var email = userData.email;
    var trainerName = userData.trainerName;
        var profilePic = userData.profilePic;

    var time;
    var kg;
    var km;

        var timeTillNow = userData.minutes;
        time = Number(newTime) + Number(timeTillNow);

        var kgTillNow = userData.kg;
        kg = Number(newKg) + Number(kgTillNow);

        var kmTillNow = userData.km;
        km = Number(newKm) + Number(kmTillNow);
        
        var levelTillNow = userData.level;
        var level = Math.sqrt(time / 60);
        level++;
        
        if(Math.floor(level) > Math.floor(levelTillNow)) {
            levelUp();
           // sendMail(userData.username, level);
        }

    var data = {
        fullname: fullname,
        gender: gender,
        email: email,
        trainerName: trainerName,
        level: level,
        minutes: time,
        kg: kg,
        km: km,
        profilePic: profilePic
    };

    $.ajax({
        type: "PUT",
        url: kinveyAddUrl,
        headers: kinveyAuthHeaders,
        async: false,
        data: data,
        success: addActivitySuccess,
        error: handleAjaxError
    });
    function addActivitySuccess(response) {
        showInfo('Activity added!.');
        sessionStorage.currentUser = JSON.stringify(response);
        addRanking(userData.username, level, gender);
        addActivityLog(userData.username, newTime, newKg, newKm);
    }
    
}

function sendMail(username, level) {
    var link = "mailto:elitooo@gmail.com"
             + "&subject=" + encodeURI(username + "levelled up")
             + "&body=" + encodeURI(username + "is now level" + level)
    ;
    location.href = link;
}
