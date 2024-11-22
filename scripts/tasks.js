// Function to fetch and display tasks
async function displayTasks() {
    const tasksRef = db.collection('prepopulated-tasks');
    const querySnapshot = await tasksRef.get();
    const taskContainer = document.getElementById('task-container');
    taskContainer.innerHTML = ''; // Clear previous content

    querySnapshot.forEach((doc) => {
        const tasks = doc.data().tasks;

        tasks.forEach(task => {
            const taskCard = createTaskCard(task.title, task.course); // Pass course name
            taskContainer.appendChild(taskCard);
        });
    });
}

// Function to create a task card element
function createTaskCard(taskTitle, courseName) {
    const taskCard = document.createElement('div');
    taskCard.className = `task-card ${courseName}`; // Add course name as a class
    taskCard.innerHTML = `
        <h4 class="course-name">${courseName}</h4> <!-- Display course name -->
        <input type="text" class="task-title-input" value="${taskTitle}">
        <div class="add-btn-box">    
            <button class="green-btn" id="add-to-list" onclick="addToTodoList(this.previousElementSibling.value)">Add to List</button>
        </div>
    `;
    return taskCard;
}

// Function to add tasks to personal to-do list
async function addToTodoList(taskTitle) {
    const userId = "user123"; // Replace with actual user ID
    const todoRef = doc(db, 'users', userId, 'tasks', taskTitle.replace(/\s+/g, '-').toLowerCase());
    
    await setDoc(todoRef, { title: taskTitle, completed: false });
    console.log(`Task "${taskTitle}" added to to-do list!`);
}

// Call the function to display tasks
displayTasks();
