var hometitle = document.getElementById('hometitle');
var closesession = document.getElementById('closesession');

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        hometitle.innerHTML = (user.displayName == null) ? user.email : user.displayName;
        console.log(user);
    } else {
        // No user is signed in.
    }
});

closesession.addEventListener('click', function () {
    firebase.auth().signOut().then(function() {
        window.location.href = 'index.html';
    }).catch(function(error) {
        // An error happened.
    });
});