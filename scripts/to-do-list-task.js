const taskList = document.getElementById("task-container");


function setupTasks() {
    user = firebase.auth().currentUser

    const task = document.getElementById("task").value;
    const dueDate = document.getElementById("due-date").value;
    const description = document.getElementById("description").value;
    const priority = document.getElementById("priorityDropdown").value
    try {
        db.collection("personaltasks").add({
            task: task,
            dueDate: dueDate,
            description: description,
            priority: priority,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            UID: user.uid
        });
        console.log('yes')
    } catch (error) { }
    displayTask();

}
function displayTask() {
    firebase.auth().onAuthStateChanged((user) => {
        db.collection("personaltasks")
        // database query for user uid within personal task
            .where("UID", "==", user.uid)
        //------------------------------------------------
        //reading the data from the database
            .get()
            .then((personaltasks) => {
                tasks = personaltasks.docs
        //--------------------------------------------------------        
                console.log(tasks);
                taskList.innerHTML = "";
                tasks.forEach((doc) => {
            // Creating a new div for each task linking to the user.
                    const taskData = doc.data();
                    const taskElement = document.createElement("div");
                    taskElement.classList.add("to-do-list-task");
                    taskElement.innerHTML = `
            <h3 class="my-task-name">${taskData.task}</h3>
            <h4 class="my-task-priority">${taskData.priority}<img src="./assets/SVG/flag-${taskData.priority}.svg" class="priority-flag"></h4>
            <p class="my-task-due-date">Due: ${taskData.dueDate}</p>
            <p class="my-task-desc"><strong>DETAILS</strong>:<br>${taskData.description}</p>
            <div class="my-task-controls">
                <button class="red-btn delete-btn" data-id="${doc.id}">Delete</button>
            <button class="green-btn" onclick="location.href='view-personal-task.html?docID=${doc.id}'">
                View
            </button>           
            </div>
              `;
                    taskList.appendChild(taskElement);
                });
            })
    })
}
//Delete user can delete task
taskList.addEventListener("click", async (event) => {
    if (event.target.classList.contains("delete-btn")) {
        const taskId = event.target.getAttribute("data-id");
        try {
            await db.collection("personaltasks").doc(taskId).delete();
            displayTask();
        } catch (error) { }
    }
});

// display user own buddy from database

function displaybuddy() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {

            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {

                    let userBuddy = userDoc.data().buddy;

                    document.getElementById('buddy').src = `./assets/animals/${userBuddy}.svg`

                })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    })
}

displaybuddy()
displayTask()