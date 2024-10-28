let points = 0;

// Update points when a task is completed
async function updatePoints() {
    points++;
    document.getElementById('points').textContent = points;
    // Store or update points in Firestore
    const userId = auth.currentUser.uid; // Get current user ID
    await db.collection("users").doc(userId).set({ points: points }, { merge: true });
}

// Call `updatePoints()` in task completion functions where applicable.