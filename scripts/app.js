const kinveyBaseUrl = "https://baas.kinvey.com/";
const kinveyAppKey = "kid_BkVIpqgd";
const kinveyAppSecret = "8201384490694a5f9e73ef67534081e2";

function start() {

    $('#login-request-button').click(function (e) {
        e.preventDefault();
        login();
    });
    $('#register-request-button').click(function (e) {
        e.preventDefault();
        register();
    });
    $('#submit-activity-button').click(function (e) {
        e.preventDefault();
        addActivity();
    });
    $(document).on({
        ajaxStart: function () {
            $("#loadingBox").show()
        },
        ajaxStop: function () {
            $("#loadingBox").hide()
        }
    });
}


function showInfo(message) {
    $('#infoBox').text(message);
    $('#infoBox').show();
    setTimeout(function () { $('#infoBox').fadeOut()}, 3000)
}
function showError(errorMsg) {
    $('#errorBox').text("Error:" + errorMsg);
    $('#errorBox').show();
}

function levelUp() {
        $('#levelUpBox').show();
}

function logout() {
    sessionStorage.clear();
    window.location.replace("index.html");
}

function handleAjaxError(data, status) {
    let errorMsg = "Error :" +  JSON.stringify(data);
    $("#errorBox").text(errorMsg).show();
}
