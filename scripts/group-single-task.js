function displayTaskInfo() {
    let params = new URL(window.location.href); //get URL of search bar
    let ID = params.searchParams.get("docID"); //get value for key "id"

    db.collection("tasks")
        .doc(ID)
        .get()
        .then(doc => {
            taskTitle = doc.data().task;
            dueDate = doc.data().dueDate;
            description = doc.data().description;

            // only populate title, and image
            document.getElementById("task-display").value = taskTitle;
            document.getElementById("duedate-display").value = dueDate;
            document.getElementById("description-display").value = description;

        });
}

displayTaskInfo();

function editTaskInfo() {
    //Enable the form fields
    document.getElementById('taskInfoFields').disabled = false;
}

function saveTaskInfo() {
    //enter code here

    let params = new URL(window.location.href); //get URL of search bar
    let ID = params.searchParams.get("docID");

    //a) get user entered values
    taskName = document.getElementById('task-display').value;       //get the value of the field with id="nameInput"
    duedate = document.getElementById('duedate-display').value;     //get the value of the field with id="schoolInput"
    descriptionInfo = document.getElementById('description-display').value;       //get the value of the field with id="cityInput"

    //b) update user's document in Firestore
    db.collection("tasks")
    .doc(ID)
    .update({
        dueDate: duedate,
        task: taskName,
        description: descriptionInfo
    })    


    document.getElementById('personalInfoFields').disabled = true;
}