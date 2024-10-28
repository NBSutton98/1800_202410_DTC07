//---------------------------------
// Your own functions here
//---------------------------------

// Function to show the popup
function showPopup() {
  const popup = document.getElementById('popup');
  const overlay = document.getElementById('overlay');
  popup.classList.add('show');
  overlay.classList.add('show');
}

// Function to close the popup
function closePopup() {
  const popup = document.getElementById('popup');
  const overlay = document.getElementById('overlay');
  popup.classList.remove('show');
  overlay.classList.remove('show');
}

// Automatically show the popup after 3 seconds (3000 milliseconds)
setTimeout(showPopup, 2500);

// Event listener for closing the popup
document.getElementById('closePopup').onclick = closePopup;
document.getElementById('overlay').onclick = closePopup;

//------------------------------------------------
// Call this function when the "logout" button is clicked
//-------------------------------------------------
function logout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("logging out user");
      }).catch((error) => {
        // An error happened.
      });
}