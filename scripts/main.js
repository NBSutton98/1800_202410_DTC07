function getNameFromAuth() {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if a user is signed in:
    if (user) {
      // Do something for the currently logged-in user here:
      console.log(user.uid); //print the uid in the browser console
      console.log(user.displayName); //print the user name in the browser console
      userName = user.displayName;

      document.getElementById("name-goes-here").innerText = userName;

      //method #2:  insert using jquery
      //$("#name-goes-here").text(userName); //using jquery

      //method #3:  insert using querySelector
      //document.querySelector("#name-goes-here").innerText = userName
    } else {
      // No user is signed in.
      console.log("No user is logged in");
    }
  });
}
getNameFromAuth(); //run the function

//enter input using html input fields
//recive input and process to  fires store db 
//retreuve data and display on html page 

document.querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent the form from submitting the traditional way

  // Get form data
  const task = document.getElementById("task").value;
  const dueDate = document.getElementById("due-date").value;
  const description = document.getElementById("description").value;

  // Add a new document with a generated ID
  try {
    await db.collection("tasks").add({
      task: task,
      dueDate: dueDate,
      description: description,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    alert("Task added successfully!");
  } catch (error) {
    console.error("Error adding task: ", error);
    alert("Failed to add task");
  }
});

const taskList = document.getElementById("task-list");

// Listen for real-time updates in Firestore
db.collection("tasks").orderBy("createdAt", "desc").onSnapshot((snapshot) => {
    taskList.innerHTML = ""; // Clear existing tasks
    snapshot.docs.forEach((doc) => {
      const taskData = doc.data();
      const taskElement = document.createElement("div");
      taskElement.classList.add(
        "bg-white",
        "rounded-lg",
        "shadow-md",
        "p-4",
        "mb-4"
      );

      taskElement.innerHTML = `
        <h3 class="text-md font-semibold">${taskData.task}</h3>
        <p class="text-sm text-gray-700">Due: ${taskData.dueDate}</p>
        <p class="text-sm">${taskData.description}</p>
        <button class="delete-btn text-red-500 mt-2" data-id="${doc.id}">Delete</button>      `;

      taskList.appendChild(taskElement);
    });


    // Add an event listener to the task list to listen for clicks on any task element
    taskList.addEventListener("click", async (event) => {
      // Check if the element that was clicked is a button with class "delete-btn"
      if (event.target.classList.contains("delete-btn")) {
        // Get the ID of the task from the button's data-id attribute
        const taskId = event.target.getAttribute("data-id");

        try {
          // Use the Firestore SDK to delete the task with the given ID
          await db.collection("tasks").doc(taskId).delete();
          // Show a success message to the user
          alert("Task deleted successfully!");
        } catch (error) {
          // Log any errors to the console
          console.error("Error deleting task: ", error);
          // Show an error message to the user
          alert("Failed to delete task");
        }
      }
    });
  });
