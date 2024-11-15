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
            document.getElementById("task-display").innerHTML = taskTitle;
            document.getElementById("duedate-display").innerHTML = dueDate;
            document.getElementById("description-display").innerHTML = description;

        });
}

displayTaskInfo();

