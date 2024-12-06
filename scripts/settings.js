var currentUser;
document.getElementById('cancel-btn').style.display = 'none';

function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid)
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    let userName = userDoc.data().name;
                    let userBuddy = userDoc.data().buddy;
                    let buddyName = userDoc.data().buddyname;
                    let buddyPersonality = userDoc.data().buddypersonality;
                    let userPronoun = userDoc.data().userpronoun;
                    let userFavClass = userDoc.data().favclass;

                    // Displaying the buddy from data ing formation
                    document.getElementById('buddy').src = `./assets/animals/${userBuddy}.svg`
                    if (userName != null) {
                        document.getElementById("username").value = userName;
                    }
                    if (userBuddy != null) {
                        document.getElementById("dropdown").value = userBuddy;
                    }
                    if (buddyName != null) {
                        document.getElementById('Buddy-name').value = buddyName
                    }
                    if (buddyPersonality != null) {
                        document.getElementById('Buddy-personality').value = buddyPersonality
                    }
                    if (userFavClass != null) {
                        document.getElementById('dropdownclass').value = userFavClass
                    }
                    if (userPronoun != null) {
                        document.getElementById('userPronoun').value = userPronoun
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
    //GETs data from the form in setting html page -------------
    userName = document.getElementById('username').value;
    userBuddy = document.getElementById('dropdown').value;
    userBuddyName = document.getElementById('Buddy-name').value;
    userBuddyPersonality = document.getElementById('Buddy-personality').value;
    userPronoun = document.getElementById('userPronoun').value;
    userFavClass = document.getElementById('dropdownclass').value;
    // UPDATE - updates database link to user from form data in settings
    currentUser.update({
        name: userName,
        buddy: userBuddy,
        buddyname: userBuddyName,
        buddypersonality: userBuddyPersonality,
        userpronoun: userPronoun,
        favclass: userFavClass

    })
        .then(() => {
            console.log("Document successfully updated!");
        })
    document.getElementById('userInfoFields').disabled = true;
    document.getElementById('edit-btn').style.display = 'block';
    document.getElementById('cancel-btn').style.display = 'none';
    populateUserInfo();
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