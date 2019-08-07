var email = document.getElementById('inputEmail');
var password = document.getElementById('inputPassword');
var loginbtn = document.getElementById('loginbtn');
var alerterror = document.getElementById('alerterror');

var user = firebase.auth().currentUser;
console.log(user);
if (user) {
    window.location.href = "home.html";
}
var bloqueo = 0;
loginbtn.addEventListener('click', function (e) {
    var blocked = localStorage.getItem("isBlocked");
    var currentDate = new Date();
    var oldTime = localStorage.getItem("DateBlock");
    var segundosTranscurridos = (currentDate.getTime() - oldTime) / 1000;
    if (segundosTranscurridos >= 1500) {
        localStorage.clear();
    }
    if (blocked == "false" || blocked == null) {
        firebase.auth().signInWithEmailAndPassword(email.value, password.value).then(function (result) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", '/controller_web/php/insertarregistro.php', true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    window.location.href = "home.html";
                    console.log(result);
                }
            };
            xhr.send("uid=" + result.user.uid);
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alerterror.style.display = 'block';
            alerterror.innerHTML = errorMessage;
            bloqueo += 1;
            if (bloqueo == 3) {
                var dateBlock = new Date();
                localStorage.setItem("DateBlock", String(dateBlock.getTime()));
                localStorage.setItem("isBlocked", String(true));
            }
        });
    } else {
        alerterror.style.display = 'block';
        alerterror.innerHTML = "Su cuenta ha sido bloqueada, intentelo mas tarde.";
    }
    e.preventDefault();
});