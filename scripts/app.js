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
