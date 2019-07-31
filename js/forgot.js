var forgotEmail = document.getElementById('forgotEmail');
var forgotbutton = document.getElementById('forgotbutton');
var forgotalert = document.getElementById('alertforgot');
var alertsuccess = document.getElementById('alertsuccess');

forgotbutton.addEventListener('click', function (e) {
    var auth = firebase.auth();
    var emailAddress = forgotEmail.value;
    auth.sendPasswordResetEmail(emailAddress).then(function () {
        alertsuccess.style.display = 'block';
        forgotEmail.value = "";
    }).catch(function (error) {
        // An error happened.
        console.log(error);
        forgotalert.style.display = 'block';
    });
    e.preventDefault();
});