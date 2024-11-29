document.getElementById('addTaskBtn').onclick = async function() {
    const task = document.getElementById('taskInput').value;
    if (task) {
        await db.collection("tasks").add({
            task: task,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        document.getElementById('taskInput').value = '';
    }
};

// Listen for updates
db.collection("tasks").orderBy("createdAt")
    .onSnapshot(snapshot => {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
        snapshot.forEach(doc => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = doc.data().task;
            taskList.appendChild(li);
        });
    });