//---------------------------------
// Your own functions here
//---------------------------------


//------------------------------------------------
// Call this function when the "logout" button is clicked
//-------------------------------------------------
function logout() {
    firebase.auth().signOut().then(() => {
        window.location.assign("index.html");
        console.log("logging out user");
      }).catch((error) => {
        // An error happened.
      });
}