function writePrepopulatedTasks() {
    // Define pre-populated tasks for each class
    var prePopulatedTasksRef = db.collection("prepopulated-tasks");

    // Define tasks structured with course names
    const prePopulatedTasks = {
        'COMP1100': [
            { title: 'Attend Class', completed: false, course: 'COMP1100' },
            { title: 'Participate in Discussions', completed: false, course: 'COMP1100' },
            { title: 'Complete Learning Plan', completed: false, course: 'COMP1100' },
        ],
        'COMM1116': [
            { title: 'Attend Class', completed: false, course: 'COMM1116' },
            { title: 'Participate in Class', completed: false, course: 'COMM1116' },
            { title: 'Demonstrate Professionalism', completed: false, course: 'COMM1116' },
            { title: 'Show Comprehension in Exercises', completed: false, course: 'COMM1116' },
        ],
        'COMP1113': [
            { title: 'Attend Class', completed: false, course: 'COMP1113' },
            { title: 'Participate in Activities', completed: false, course: 'COMP1113' },
            { title: 'Study for Exams', completed: false, course: 'COMP1113' },
            { title: 'Complete Quizzes', completed: false, course: 'COMP1113' },
        ],
        'COMP1510': [
            { title: 'Attend Class', completed: false, course: 'COMP1510' },
            { title: 'Participate in Class', completed: false, course: 'COMP1510' },
            { title: 'Practice Coding Tasks', completed: false, course: 'COMP1510' },
            { title: 'Study Sample Code', completed: false, course: 'COMP1510' },
            { title: 'Take Quizzes', completed: false, course: 'COMP1510' },
            { title: 'Help Classmates', completed: false, course: 'COMP1510' },
        ],
        'COMP1712': [
            { title: 'Attend Class', completed: false, course: 'COMP1712' },
            { title: 'Participate in Discussions', completed: false, course: 'COMP1712' },
            { title: 'Complete Assignments', completed: false, course: 'COMP1712' },
            { title: 'Submit Lab Reports', completed: false, course: 'COMP1712' },
            { title: 'Review Slides', completed: false, course: 'COMP1712' },
        ],
        'COMP1537': [
            { title: 'Attend Class', completed: false, course: 'COMP1537' },
            { title: 'Participate in Activities', completed: false, course: 'COMP1537' },
            { title: 'Complete CSS Assignments', completed: false, course: 'COMP1537' },
            { title: 'Complete HTML Assignments', completed: false, course: 'COMP1537' },
            { title: 'Complete JavaScript Assignments', completed: false, course: 'COMP1537' },
            { title: 'Review Material', completed: false, course: 'COMP1537' },
        ],
        'COMP1800': [
            { title: 'Attend Class', completed: false, course: 'COMP1800' },
            { title: 'Participate in Activities', completed: false, course: 'COMP1800' },
            { title: 'Teach Group a New Skill', completed: false, course: 'COMP1800' },
            { title: 'Review JavaScript', completed: false, course: 'COMP1800' },
            { title: 'Update Trello', completed: false, course: 'COMP1800' },
            { title: 'Submit Labs', completed: false, course: 'COMP1800' },
            { title: 'Submit Demo', completed: false, course: 'COMP1800' },
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