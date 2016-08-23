function encodeImageFileAsURL() {

    var filesSelected = document.getElementById("inputFileToLoad").files;
    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];

        var fileReader = new FileReader();

        fileReader.onload = function(fileLoadedEvent) {
            var srcData = fileLoadedEvent.target.result; // <--- data: base64

            var newImage = document.createElement('img');
            newImage.src = srcData;

            document.getElementById("imgTest").innerHTML = newImage.outerHTML;
           
            //console.log("Converted Base64 version is " + document.getElementById("imgTest").innerHTML);

            document.getElementById("output").src = newImage.src;
        }
        fileReader.readAsDataURL(fileToLoad);
    }
}
function register() {

    const kinveyRegUrl = kinveyBaseUrl + "user/" + kinveyAppKey + "/";
    const kinveyAuthHeaders = {'Authorization': 'Basic ' + btoa(kinveyAppKey + ":" + kinveyAppSecret)};

    let username = $('#username').val();
    let fullName = $('#full-name').val();
    let gender = $("#gender").val();
    let email = $('#email').val();
    let trainer = $("#trainer").val();
    let password = $('#password').val();
    let profilePic = document.getElementById("imgTest").innerHTML;


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
        km: 0,
        profilePic: profilePic
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
