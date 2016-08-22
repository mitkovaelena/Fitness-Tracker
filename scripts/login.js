
function login() {
    const kinveyLoginUrl = kinveyBaseUrl + "user/" + kinveyAppKey + "/login";
    const kinveyAuthHeaders = {'Authorization': 'Basic ' + btoa(kinveyAppKey + ":" + kinveyAppSecret)};

    let username = $('#username').val();
    let password = $('#password').val();

    let loginData = {
        username: username,
        password: password
    };

    $.ajax({
        type: "POST",
        url: kinveyLoginUrl,
        headers: kinveyAuthHeaders,
        data: loginData,
        success: loginSuccess,
        error: handleAjaxError
    });
    function loginSuccess(data, status) {
        showInfo('Login successful.');
        sessionStorage.currentUser = JSON.stringify(data);
        sessionStorage.authToken = data._kmd.authtoken;
        sessionStorage.id = data._id;
        window.location.replace("profile.html");
    }
}
