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

// Enter input using HTML input fields
document
  .getElementById("chat-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    // Set variables to parts of the chat-display
    const chatInputElement = document.getElementById("chat-input");
    const chatInput = chatInputElement.value;
    const chatDisplay = document.getElementById("chat-display");

    // Receive input and process to Firestore DB
    try {
      // Save the message to Firestore
      await db.collection("messages").add({
        text: chatInput,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(), // Add a timestamp to order messages
      });
      chatInputElement.value = ""; // Clear the input field after sending
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    //retreuve data and display on html page
  });

// Reference to the chat display
const chatDisplay = document.getElementById("chat-display");

// Listen for new messages in real-time
db.collection("messages")
  .orderBy("createdAt") // Ensure messages are ordered by timestamp
  .onSnapshot((snapshot) => {
    chatDisplay.innerHTML = "";
    snapshot.forEach((doc) => {
      const messageData = doc.data();
      const messageElement = document.createElement("div");
      messageElement.textContent = messageData.text;

      // Append each message to the chat display
      chatDisplay.appendChild(messageElement);
    });
  });

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
  } catch (error) {}

  const taskList = document.getElementById("task-list");

  // Listen for real-time updates in Firestore
  db.collection("tasks")
    .orderBy("createdAt", "desc")
    .onSnapshot((snapshot) => {
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
          } catch (error) {}
        }
      });
    });
});
