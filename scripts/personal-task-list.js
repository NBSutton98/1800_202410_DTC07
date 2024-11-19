const db = getFirestore();
const personalTaskList = document.getElementById('personal-task-list');
const addPersonalTaskBtn = document.getElementById('add-personal-task-btn');
const customPersonalTaskInput = document.getElementById('custom-personal-task-input');

// Function to load tasks from a specific collection
async function loadTasksFromCollection(collectionName) {
    const querySnapshot = await getDocs(collection(db, collectionName));
    querySnapshot.forEach((doc) => {
        const tasks = doc.data().tasks;
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.title;
            personalTaskList.appendChild(li);
        });
    });
}

// Load tasks from all sources on page load
async function loadAllTasks() {
    personalTaskList.innerHTML = '';
    await loadTasksFromCollection('prepopulated-tasks');
    await loadTasksFromCollection('tasks');
}

// Add a custom task
addPersonalTaskBtn.addEventListener('click', async () => {
    const taskTitle = customPersonalTaskInput.value;
    if (taskTitle) {
        await addDoc(collection(db, 'users'), {
            title: taskTitle,
            completed: false
        });
        const li = document.createElement('li');
        li.textContent = taskTitle;
        personalTaskList.appendChild(li);
        customPersonalTaskInput.value = '';
    }
});

// Load all tasks when the page loads
window.addEventListener('DOMContentLoaded', loadAllTasks);