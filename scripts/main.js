let taskList = document.getElementById("task-list");
function getNameFromAuth() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      currentUser = db.collection("users").doc(user.uid);
      console.log(user.uid);
      console.log(user.displayName);





//READ reads the user name from which the user is logged in---------------------N2
      currentUser.get().then((user) => {
        userName = user.data().name;
        console.log(userName);
        document.getElementById("name-goes-here").innerText = userName;
      });
    } else {
      console.log("No user is logged in");
    }
  });
}
//--------------------------------------------------------------------------------------







getNameFromAuth();

function setupChat() {
  document
    .getElementById("chat-form")
    .addEventListener("submit", async (event) => {
      event.preventDefault();
      const chatInputElement = document.getElementById("chat-input");
      const chatInput = chatInputElement.value;
      const chatDisplay = document.getElementById("chat-display");







      // CREATE  - creates a server stamp to order information------------------------N1
      try {
        await db.collection("messages").add({
          text: chatInput,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          name: firebase.auth().currentUser.displayName,
        });
        chatInputElement.value = "";
      } catch (error) {}
    });
    //--------------------------------------------------------------------------------






  const chatDisplay = document.getElementById("chat-display");
  db.collection("messages")
    .orderBy("createdAt")
    .onSnapshot((snapshot) => {
      chatDisplay.innerHTML = "";
      snapshot.forEach((doc) => {
        const messageData = doc.data();

    //READ this creates a new div for the message to fall into representing a chat room
        const messageElement = document.createElement("div");
        username = messageData.name;
        messageElement.textContent = messageData.text;
        messageElement.textContent += ` - ${username}`;
        chatDisplay.appendChild(messageElement);
      });
    });
}

function setupTasks() {
  document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const task = document.getElementById("task").value;
    const dueDate = document.getElementById("due-date").value;
    const description = document.getElementById("description").value;
    try {
      await db.collection("tasks").add({
        task: task,
        dueDate: dueDate,
        description: description,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        name: firebase.auth().currentUser.displayName,
      });
    } catch (error) {}
    displayTask();
  });
}

function displayTask() {
  const taskList = document.getElementById("task-list");
  db.collection("tasks")
    .orderBy("createdAt", "desc")
    .onSnapshot((snapshot) => {
      taskList.innerHTML = "";
      snapshot.docs.forEach((doc) => {
        const taskData = doc.data();
        //CREATE ths creates a new dii for the task card to fall into 
        const taskElement = document.createElement("div");
        taskElement.classList.add("group-task-card");
        taskElement.innerHTML = `
          <h3 id="user-greeting1">${taskData.task}</h3>
          <p class="text-sm text-gray-700">Due: ${taskData.dueDate}</p>
          <p class="text-sm">${taskData.description}</p>
          <button class="delete-btn text-red-500 mt-2" data-id="${doc.id}">Delete</button>
          <a class="view-btn mt-2 ml-6" href="view-task.html?docID=${doc.id}">view</a>
            `;
        taskList.appendChild(taskElement);
      });
    });
}

taskList.addEventListener("click", async (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const taskId = event.target.getAttribute("data-id");



    //DELETE upon a click of the delete button it access the document id 'tasks' and removes it form the html and database ----------------N3
    try {
      await db.collection("tasks").doc(taskId).delete();
      displayTask();
    } catch (error) {}
  }
});
  //----------------------------------------------------------------------------------------------------------------------------------


setupChat();
setupTasks();
displayTask();
