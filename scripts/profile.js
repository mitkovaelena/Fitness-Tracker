
function profilePic() {

    var userData = JSON.parse(sessionStorage.getItem('currentUser'));
    var profilePic =userData.profilePic;
    profilePic = profilePic.substring(0, profilePic.length - 1);
        return profilePic + ' align = "left" alt="" style="height: 150px; width: 150px; margin: 5px 40px 30px; padding: 0px 0px 0px; overflow:auto;">';

}

function getLevel() {
    var userData = JSON.parse(sessionStorage.getItem('currentUser'));
    var lvlRound = Math.floor(Number(userData.level));
    $("#level").append(lvlRound);
    return userData.level;

}

function getLevelBar() {
    var userData = JSON.parse(sessionStorage.getItem('currentUser'));
    let level = Number(userData.level);
    let moreMin = level - Math.floor(level);
    let percentage = moreMin * 100;
    return percentage;

}
function getMinutes() {
    var userData = JSON.parse(sessionStorage.getItem('currentUser'));
    return userData.minutes;
}

function getUsername() {
    var userData = JSON.parse(sessionStorage.getItem('currentUser'));
    $("#username").append(userData.username);
    return userData.username;

}

function getName() {
    var userData = JSON.parse(sessionStorage.getItem('currentUser'));
    $("#name").append(userData.fullname);
    return userData.fullname;

}

function getGender() {
    var userData = JSON.parse(sessionStorage.getItem('currentUser'));
    $("#gender").append(userData.gender);
    return userData.gender;
}

function hideAchivements() {
    var userData = JSON.parse(sessionStorage.getItem('currentUser'));

    const kinveyAuthHeaders = {'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')};
    var rankingObjects;
    $.ajax({
        type: "GET",
        url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/" + "ranking/" + userData.username,
        headers: kinveyAuthHeaders,
        async: false,
        success: achvSuccess,
       // error: handleAjaxError
    });
var person;
    function achvSuccess(data) {
         person = data;
    }


    $('#1bw').show();
    $('#1').hide();

    $('#2bw').show();
    $('#2').hide();

    $('#3bw').show();
    $('#3').hide();

    $('#4bw').show();
    $('#4').hide();

    $('#5bw').show();
    $('#5').hide();

    $('#6bw').show();
    $('#6').hide();

    $('#7bw').show();
    $('#7').hide();

    $('#8bw').show();
    $('#8').hide();

    $('#9bw').show();
    $('#9').hide();

    $('#10bw').show();
    $('#10').hide();

    $('#11bw').show();
    $('#11').hide();

    $('#12bw').show();
    $('#12').hide();

    var all = 0;

    if (Number(userData.km) >= 50) {
        $('#1bw').hide();
        $('#1').show();
        all++;
    }
    if (Number(userData.km) >= 100) {
        $('#2bw').hide();
        $('#2').show();
        all++;
    }
    if (Number(userData.km) >= 200) {
        $('#3bw').hide();
        $('#3').show();
        all++;
    }
    if (Number(userData.km) >= 300) {
        $('#4bw').hide();
        $('#4').show();
        all++;
    }
    if (Number(userData.kg) >= 50) {
        $('#5bw').hide();
        $('#5').show();
        all++;
    }
    if (Number(userData.kg) >= 100) {
        $('#6bw').hide();
        $('#6').show();
        all++;
    }
    if (Number(userData.kg) >= 200) {
        $('#7bw').hide();
        $('#7').show();
        all++;
    }
    if (Number(userData.km) >= 300) {
        $('#8bw').hide();
        $('#8').show();
        all++;
    }
    if(person) {
        if (person.first == "true") {
            $('#9bw').hide();
            $('#9').show();
            all++;
        }
        if (person.second == "true") {
            $('#10bw').hide();
            $('#10').show();
            all++;
        }
        if (person.third == "true") {
            $('#11bw').hide();
            $('#11').show();
            all++;
        }
    }
    if (all == 11) {
        $('#12bw').hide();
        $('#12').show();
    }
}
