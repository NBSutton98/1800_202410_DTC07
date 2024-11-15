let taskList = document.getElementById("task-list");
function getNameFromAuth() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user.uid);
      console.log(user.displayName);
      userName = user.displayName;
      document.getElementById("name-goes-here").innerText = userName;
    } else {
      console.log("No user is logged in");
    }
  });
}
getNameFromAuth();

function setupChat() {
  document
    .getElementById("chat-form")
    .addEventListener("submit", async (event) => {
      event.preventDefault();
      const chatInputElement = document.getElementById("chat-input");
      const chatInput = chatInputElement.value;
      const chatDisplay = document.getElementById("chat-display");
      try {
        await db.collection("messages").add({
          text: chatInput,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        chatInputElement.value = "";
      } catch (error) { }
    });

  const chatDisplay = document.getElementById("chat-display");
  db.collection("messages")
    .orderBy("createdAt")
    .onSnapshot((snapshot) => {
      chatDisplay.innerHTML = "";
      snapshot.forEach((doc) => {
        const messageData = doc.data();
        const messageElement = document.createElement("div");
        messageElement.textContent = messageData.text;
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

      });

    } catch (error) { }
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
        const taskElement = document.createElement("div");
        taskElement.classList.add(
          "bg-[#f5E3a9]",
          "rounded-lg",
          "shadow-md",
          "p-4",
          "mb-4"
        );
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
    try {
      await db.collection("tasks").doc(taskId).delete();
      displayTask();
    } catch (error) { }
  }
});

setupChat();
setupTasks();
displayTask();




