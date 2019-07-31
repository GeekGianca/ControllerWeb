var loadingbar = document.getElementById('loadingbar');
var email = document.getElementById('emailReg');
var password = document.getElementById('passwordReg');
var verpassword = document.getElementById('verifypassword');
var buttonregister = document.getElementById('buttonregister');
var alerresponse = document.getElementById('alertresponse');
buttonregister.addEventListener('click', function (e) {
    loadingbar.style.display = 'block';
    if (password.value == verpassword.value) {
        firebase.auth().createUserWithEmailAndPassword(email.value, password.value).then(function (result) {
            alerresponse.style.display = 'block';
            console.log(result.user.uid);
            var xhr = new XMLHttpRequest();
            xhr.open("POST", '/controller_web/php/insertarusuario.php', true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function() { // Call a function when the state changes.
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    // Request finished. Do processing here.
                    email.value = "";
                    password.value = "";
                    verpassword.value = "";
                }
            };
            xhr.send("uid="+result.user.uid+"&correo="+email.value+"&contrasena="+password.value);
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
    } else {
        alert('Las contraseñas no coinciden');
    }
    loadingbar.style.display = 'none';
    e.preventDefault();
});