document.getElementById('addPersonalTaskBtn').onclick = async function() {
    const task = document.getElementById('personalTaskInput').value;
    if (task) {
        await db.collection("personalTasks").add({
            task: task,
            completed: false,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        document.getElementById('personalTaskInput').value = '';
    }
};

// Listen for personal tasks
db.collection("personalTasks").where("completed", "==", false)
    .onSnapshot(snapshot => {
        const personalTaskList = document.getElementById('personalTaskList');
        personalTaskList.innerHTML = '';
        snapshot.forEach(doc => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.textContent = doc.data().task;
            const completeBtn = document.createElement('button');
            completeBtn.textContent = 'Complete';
            completeBtn.className = 'btn btn-success btn-sm';
            completeBtn.onclick = async function() {
                await db.collection("personalTasks").doc(doc.id).update({ completed: true });
                li.remove();
            };
            li.appendChild(completeBtn);
            personalTaskList.appendChild(li);
        });
    });