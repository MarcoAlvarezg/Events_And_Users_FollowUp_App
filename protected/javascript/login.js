var config = {
    apiKey: "AIzaSyCnBGSa9aXUhFtUcJv96Z3KglbX8ePiTA4",
    authDomain: "ambassadors-3b8ca.firebaseapp.com",
    databaseURL: "https://ambassadors-3b8ca.firebaseio.com",
    projectId: "ambassadors-3b8ca",
    storageBucket: "ambassadors-3b8ca.appspot.com",
    messagingSenderId: "352761450769"
};
firebase.initializeApp(config)


$('#registrar').on("click", function(){
    var id = $('.id').val();
    var email = $('.email').val();
    var pass = $('.pass').val();
    var confirm = $('.confpass').val();
    var unv = $('.universidad').val();
    var city = $('.ciudad').val();
    firebase.auth().createUserWithEmailAndPassword(email,pass)
    .then(function(){
        //..
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid).set({
            nombre: id,
            email,
            unv,
            city
        });
    })
    .catch(function(error){
        //No existe el ususario
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
    });
});

$('#login').on("click", function(){
    var email = $('#email-login').val();
    var password = $('#pass-login').val();
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(){
        location = 'contenido/profile.html';
    })
    .catch(function(error){
        //No se pudo hacer login
        //..
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
    });
});

function writeNewPost(nombreEmb, universidad, ciudad) {
    // A post entry.
    var postData = {
      nombreEmb: nombre,
      universidad: unv,
      ciudad: city
    };
  
    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child('posts').push().key;
  
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + uid + '/' + newPostKey] = postData;
  
    return firebase.database().ref().update(updates);
  }




