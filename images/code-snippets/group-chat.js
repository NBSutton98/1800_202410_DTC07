document.getElementById('sendMessageBtn').onclick = async function() {
    const message = document.getElementById('messageInput').value;
    if (message) {
        await db.collection("messages").add({
            message: message,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        document.getElementById('messageInput').value = '';
    }
};

// Listen for new messages
db.collection("messages").orderBy("createdAt")
    .onSnapshot(snapshot => {
        const chatBox = document.getElementById('chatBox');
        chatBox.innerHTML = '';
        snapshot.forEach(doc => {
            const div = document.createElement('div');
            div.textContent = doc.data().message;
            chatBox.appendChild(div);
        });
        chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
    });