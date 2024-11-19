var currentUser;               //points to the document of the user who is logged in
document.getElementById('cancel-btn').style.display = 'none';

console.log(document.getElementById('dropdown').value)

function editInfo() {
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


function saveInfo() {
    console.log(document.getElementById('dropdown').value)

    userName = document.getElementById('Buddy-name').value;
    userBuddy = document.getElementById('dropdown').value;


    currentUser.update({
        name: userName,
        buddy: userBuddy
    })
        .then(() => {
            console.log("Document successfully updated!");
        })
    document.getElementById('userInfoFields').disabled = true;
    document.getElementById('edit-btn').style.display = 'block';
    document.getElementById('cancel-btn').style.display = 'none';
    populateUserInfo()
}


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
                })
            document.getElementById('buddy').src = `"./assets/animals/"${userBuddy}'.svg'`


        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}

populateUserInfo();