document.getElementById('createGroupBtn').onclick = async function() {
    const groupName = document.getElementById('groupName').value;
    if (groupName) {
        const groupDoc = await db.collection("groups").add({ name: groupName });
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = groupName;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'btn btn-danger btn-sm float-end';
        deleteBtn.onclick = async function() {
            await db.collection("groups").doc(groupDoc.id).delete();
            li.remove();
        };
        li.appendChild(deleteBtn);
        document.getElementById('groupList').appendChild(li);
        document.getElementById('groupName').value = '';
    }
};

// Listen for groups
db.collection("groups")
    .onSnapshot(snapshot => {
        const groupList = document.getElementById('groupList');
        groupList.innerHTML = '';
        snapshot.forEach(doc => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = doc.data().name;
            groupList.appendChild(li);
        });
    });