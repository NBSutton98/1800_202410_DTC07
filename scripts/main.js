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



// document is a global that represents the entire HTML
//.getElementById method for the document object that looks for a especific element by its ID
//"Chat-Form" is the ID from the html page 

//.addEventListener waits for a function to be called 
//So, addEventListener("submit", ...) is telling the chat-form element: “Whenever someone submits this form, execute the specified function.
//“When the form with ID chat-form is submitted, prevent the page reload, and run this asynchronous function instead.” This allows you to control what happens with the form data, such as sending it to a server without refreshing the page.
document.getElementById("chat-form").addEventListener("submit", async (event) => { 
    event.preventDefault();
//accsess the value of the chat-input ID
    const chatInputElement = document.getElementById("chat-input");
//Store the value of the chat-input ID
    const chatInput = chatInputElement.value;
//accsess the value of the chat-display ID
    const chatDisplay = document.getElementById("chat-display");
    try {
//db.collection accesses the "messages" collection in your Firestore database
// .add creates a new document in the "messages" collection
// text: chatInput is message stored from the chat-input ID
// createdAt just stores the current time to organze the messages
      await db.collection("messages").add({
        text: chatInput,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(), 
      });
      chatInputElement.value = ""; 
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  });

// get the id 'chat-display' and store it in the chatDisplay variable
const chatDisplay = document.getElementById("chat-display");
//db.collection accesses the "messages" collection in your Firestore database
//.onSnapshot grabs the data from the "messages" collection and hols it in the snapshot variable
db.collection("messages").orderBy("createdAt").onSnapshot((snapshot) => {
//This clears the chat-display ID
    chatDisplay.innerHTML = "";
//This loops through each message
    snapshot.forEach((doc) => {
//store the data from each message
      const messageData = doc.data();
//create a new div
      const messageElement = document.createElement("div");
//adds message data to the div
      messageElement.textContent = messageData.text;
//appends the div to the chat-display
      chatDisplay.appendChild(messageElement);
    });
  });






//Selects the first HTML element that matches the CSS selector
document.querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault(); 
//accsess HTML and looks for the ID Task and stores the value in variable task
  const task = document.getElementById("task").value;
//accsess HTML and looks for the ID Due-Date and stores the value in variable dueDate
  const dueDate = document.getElementById("due-date").value;
  const description = document.getElementById("description").value;
  try {
//db.collection accesses the "tasks" collection in your Firestore database
    await db.collection("tasks").add({
      task: task,
      dueDate: dueDate,
      description: description,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {}

//accsess HTML and looks for the ID Task-List 
  const taskList = document.getElementById("task-list");
//db.collection creates the "tasks" collection in your Firestore database
  db.collection("tasks").orderBy("createdAt", "desc").onSnapshot((snapshot) => {
    taskList.innerHTML = "";
    //snapshot This is the result of a Firestore query, such as when you fetch data from a collection.
    //It's like a container that holds all the documents (records) you retrieved from the database.

    //docs: This is an array that contains all the documents inside the snapshot.
    //Each document represents a single item (like a task) in the Firestore database.
    //.forEach((doc) => { ... }) is a method that loops over every document
    snapshot.docs.forEach((doc) => {
      //store the the data
      const taskData = doc.data();

      //create a new div
      const taskElement = document.createElement("div");
      //adds css to the div
      taskElement.classList.add(
        "bg-white",
        "rounded-lg",
        "shadow-md",
        "p-4",
        "mb-4"
      );
      //adds HTML and data to the div
      taskElement.innerHTML = `
        <h3 class="text-md font-semibold">${taskData.task}</h3>
        <p class="text-sm text-gray-700">Due: ${taskData.dueDate}</p>
        <p class="text-sm">${taskData.description}</p>
        <button class="delete-btn text-red-500 mt-2" data-id="${doc.id}">Delete</button>      `;
        //adds the div after taskList
      taskList.appendChild(taskElement);
    });

    taskList.addEventListener("click", async (event) => {
//checks if clicked element is a delete button
      if (event.target.classList.contains("delete-btn")) {
        // retrieves the data-id attribute from the clicked delete button.
        //event.target: Refers to the clicked element, which is the delete button i
        const taskId = event.target.getAttribute("data-id");
        try {
          // /db.collection("tasks") targets the tasks collection in your Firestore
          //doc(taskId) specifies the document that you want to interact with by its unique identifier (taskId
          await db.collection("tasks").doc(taskId).delete();
        } catch (error) {}
      }
    });
  });
});
