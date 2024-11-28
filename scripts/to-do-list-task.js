// function displayTaskInfo() {
//     let params = new URL(window.location.href); //get URL of search bar
//     let ID = params.searchParams.get("docID"); //get value for key "id"

//     db.collection("tasks")
//         .doc(ID)
//         .get()
//         .then(doc => {
//             taskTitle = doc.data().task;
//             dueDate = doc.data().dueDate;
//             description = doc.data().description;

//             // only populate title, and image
//             document.getElementById("task-display").innerHTML = taskTitle;
//             document.getElementById("duedate-display").innerHTML = dueDate;
//             document.getElementById("description-display").innerHTML = description;

//         });
// }

// displayTaskInfo();

const taskList = document.getElementById("task-container");


function setupTasks() {

    //   event.preventDefault();
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
    // displayTask();

}
// user = firebase.auth().currentUser
function displayTask() {
    firebase.auth().onAuthStateChanged((user) => {
        db.collection("personaltasks")
            .where("UID", "==", user.uid)
            .get()
            .then((personaltasks) => {
                tasks = personaltasks.docs
                console.log(tasks);
                taskList.innerHTML = "";
                tasks.forEach((doc) => {
                    const taskData = doc.data();
                    const taskElement = document.createElement("div");
                    taskElement.classList.add("hi");
                    taskElement.innerHTML = `
            <h3 id="user-greeting1">${taskData.task}</h3>
            <p class="text-sm text-gray-700">Due: ${taskData.dueDate}</p>
            <p class="text-sm">${taskData.priority}</p>
            <p class="text-sm">${taskData.description}</p>
            <button class="delete-btn text-red-500 mt-2" data-id="${doc.id}">Delete</button>
            <a class="view-btn mt-2 ml-6" href="view-personal-task.html?docID=${doc.id}">view</a>
              `;
                    taskList.appendChild(taskElement);
                });
            })
    })
}

taskList.addEventListener("click", async (event) => {
    if (event.target.classList.contains("delete-btn")) {
      const taskId = event.target.getAttribute("data-id");
      try {
        await db.collection("personaltasks").doc(taskId).delete();
        displayTask();
      } catch (error) {}
    }
  });


displayTask()