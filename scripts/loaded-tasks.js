function writePrepopulatedTasks() {
    // Define pre-populated tasks for each class
    var prePopulatedTasksRef = db.collection("prepopulated-tasks");

    // Define tasks structured properly
    const prePopulatedTasks = {
        'COMP1100': [
            { title: 'Attend Class', completed: false },
            { title: 'Participate in Discussions', completed: false },
            { title: 'Complete Learning Plan', completed: false },
        ],
        'COMM1116': [
            { title: 'Attend Class', completed: false },
            { title: 'Participate in Class', completed: false },
            { title: 'Demonstrate Professionalism', completed: false },
            { title: 'Show Comprehension in Exercises', completed: false },
        ],
        'COMP1113': [
            { title: 'Attend Class', completed: false },
            { title: 'Participate in Activities', completed: false },
            { title: 'Study for Exams', completed: false },
            { title: 'Complete Quizzes', completed: false },
        ],
        'COMP1510': [
            { title: 'Attend Class', completed: false },
            { title: 'Participate in Class', completed: false },
            { title: 'Practice Coding Tasks', completed: false },
            { title: 'Study Sample Code', completed: false },
            { title: 'Take Quizzes', completed: false },
            { title: 'Help Classmates', completed: false },
        ],
        'COMP1712': [
            { title: 'Attend Class', completed: false },
            { title: 'Participate in Discussions', completed: false },
            { title: 'Complete Assignments', completed: false },
            { title: 'Submit Lab Reports', completed: false },
            { title: 'Review Slides', completed: false },
        ],
        'COMP1537': [
            { title: 'Attend Class', completed: false },
            { title: 'Participate in Activities', completed: false },
            { title: 'Complete CSS Assignments', completed: false },
            { title: 'Complete HTML Assignments', completed: false },
            { title: 'Complete JavaScript Assignments', completed: false },
            { title: 'Review Material', completed: false },
        ],
        'COMP1800': [
            { title: 'Attend Class', completed: false },
            { title: 'Participate in Activities', completed: false },
            { title: 'Teach Group a New Skill', completed: false },
            { title: 'Review JavaScript', completed: false },
            { title: 'Update Trello', completed: false },
            { title: 'Submit Labs', completed: false },
            { title: 'Submit Demo', completed: false },
        ]
    };

    // Iterate over the tasks and write them to Firestore
    Object.keys(prePopulatedTasks).forEach(async (className) => {
        const tasks = prePopulatedTasks[className];
        const classRef = prePopulatedTasksRef.doc(className); // Create a document for each class

        // Set the tasks for the class
        await classRef.set({ tasks: tasks });
        console.log(`Tasks for ${className} added successfully.`);
    });
}

// Call the function to write pre-populated tasks
writePrepopulatedTasks();