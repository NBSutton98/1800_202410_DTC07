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
                    let userBuddy = userDoc.data().buddy;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("Buddy-name").value = userName;
                    }
                    if (userBuddy != null) {
                        document.getElementById("dropdown").value = userBuddy;
                    }
                    document.getElementById('buddy').src = `./assets/animals/${userBuddy}.svg`
                })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}

populateUserInfo();