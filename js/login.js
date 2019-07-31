var email = document.getElementById('inputEmail');
var password = document.getElementById('inputPassword');
var loginbtn = document.getElementById('loginbtn');
var alerterror = document.getElementById('alerterror');

var user = firebase.auth().currentUser;
if (user) {
    window.location.href = "home.html";
}

loginbtn.addEventListener('click', function (e) {
    firebase.auth().signInWithEmailAndPassword(email.value, password.value).then(function (result) {
        window.location.href = "home.html";
        console.log(result);
    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alerterror.style.display = 'block';
        alerterror.innerHTML = errorMessage;
    });
    e.preventDefault();
});