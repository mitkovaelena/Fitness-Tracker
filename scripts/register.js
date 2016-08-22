var loadFile = function(event) {
    var reader = new FileReader();
    reader.onload = function(){
        var output = document.getElementById('output');
        output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
};

function register() {

    const kinveyRegUrl = kinveyBaseUrl + "user/" + kinveyAppKey + "/";
    const kinveyAuthHeaders = {'Authorization': 'Basic ' + btoa(kinveyAppKey + ":" + kinveyAppSecret)};

    let username = $('#username').val();
    let fullName = $('#full-name').val();
    let gender = $("#gender").val();
    let email = $('#email').val();
    let trainer = $("#trainer").val();
    let password = $('#password').val();


    let data = {
        username: username,
        fullname: fullName,
        gender: gender,
        email: email,
        trainerName: trainer,
        password: password,
        level: 1,
        minutes: 0,
        kg: 0,
        km: 0
    };

    $.ajax({
        type: "POST",
        url: kinveyRegUrl,
        headers: kinveyAuthHeaders,
        data: data,
        success: registerSuccess,
        error: handleAjaxError
    });
    function registerSuccess(response) {
        showInfo('Registration successful.');
        window.location.replace("login.html");
    }
}
