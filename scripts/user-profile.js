var currentUser;               //points to the document of the user who is logged in

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
                    let buddyPersonality = userDoc.data().buddypersonality;
                    let buddyName = userDoc.data().buddyname;
                    let userBuddy = userDoc.data().buddy;

                    document.getElementById('buddy').src = `./assets/animals/${userBuddy}.svg`

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("username").innerText = userName;
                    }
                    if (buddyName != null) {
                        document.getElementById("buddy-name").innerText = buddyName;
                    }
                    if (buddyPersonality != null) {
                        document.getElementById('buddy-personality').innerText = buddyPersonality
                    }
                })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}

populateUserInfo();