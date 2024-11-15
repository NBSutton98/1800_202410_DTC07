var currentUser;               //points to the document of the user who is logged in
document.getElementById('cancel-btn').style.display = 'none';

function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    let userName = userDoc.data().name;
                    let userEmail = userDoc.data().email;
                    let userBuddy = userDoc.data().buddy;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("username").value = userName;
                    }
                    if (userEmail != null) {
                        document.getElementById("email").value = userEmail;
                    }
                    if (userBuddy != null) {
                        document.getElementById("BCITbuddy").value = userBuddy;
                    }
                })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}

populateUserInfo();

function saveUserInfo() {

    userName = document.getElementById('username').value;
    userEmail = document.getElementById('email').value;
    userBuddy = document.getElementById('BCITbuddy').value;

    currentUser.update({
        name: userName,
        email: userEmail,
        buddy: userBuddy
    })
        .then(() => {
            console.log("Document successfully updated!");
        })
    document.getElementById('userInfoFields').disabled = true;
}

function updateSFXValue(value) {
    document.getElementById("SFXValue").value = value;
}

function updateMusicValue(value) {
    document.getElementById("MusicValue").value = value;
}


function edituserInfo() {
    document.getElementById('userInfoFields').disabled = false;
    document.getElementById('edit-btn').style.display = 'none';
    document.getElementById('cancel-btn').style.display = 'block';
}

function cancelEdit() {
    document.getElementById('userInfoFields').disabled = true;
    document.getElementById('edit-btn').style.display = 'block';
    document.getElementById('cancel-btn').style.display = 'none';
    populateUserInfo();
}