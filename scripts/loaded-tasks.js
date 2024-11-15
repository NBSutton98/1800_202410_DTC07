function writePrepopulatedTasks {
    // Define pre-populated tasks for each class
    var prePopulatedTasksRef = db.collection("prepopulated-tasks")

    prePopulatedTasksRef.add = {
        // CST Fundamentals
            'COMP1100': [
                { title: 'Attend Class', completed: false },
                { title: 'Participate in Discussions', completed: false },
                { title: 'Complete Learning Plan', completed: false },
            ]
        }
    
    prePopulatedTasksRef.add = {
        // Business Communications
            'COMM1116': [
                { title: 'Attend Class', completed: false },
                { title: 'Participate in Class', completed: false },
                { title: 'Demonstrate Professionalism', completed: false },
                { title: 'Show Comprehension in Exercises', completed: false },
            ]
        }

        // Applied Mathematics
        prePopulatedTasksRef.add = {
            'COMP1113': [
                { title: 'Attend Class', completed: false },
                { title: 'Participate in Activities', completed: false },
                { title: 'Study for Exams', completed: false },
                { title: 'Complete Quizzes', completed: false },
            ]
        }

        // Programming Methods
        prePopulatedTasksRef.add = {
            'COMP1510': [
                { title: 'Attend Class', completed: false },
                { title: 'Participate in Class', completed: false },
                { title: 'Practice Coding Tasks', completed: false },
                { title: 'Study Sample Code', completed: false },
                { title: 'Take Quizzes', completed: false },
                { title: 'Help Classmates', completed: false },
            ]
        };

        // Systems Design & Business Analysis
        prePopulatedTasksRef.add = {
            'COMP1712': [
                { title: 'Attend Class', completed: false },
                { title: 'Participate in Discussions', completed: false },
                { title: 'Complete Assignments', completed: false },
                { title: 'Submit Lab Reports', completed: false },
                { title: 'Review Slides', completed: false },
            ]
        };

        // Web Development
        prePopulatedTasksRef.add = {
            'COMP1537': [
                { title: 'Attend Class', completed: false },
                { title: 'Participate in Activities', completed: false },
                { title: 'Complete CSS Assignments', completed: false },
                { title: 'Complete HTML Assignments', completed: false },
                { title: 'Complete JavaScript Assignments', completed: false },
                { title: 'Review Material', completed: false },
            ]
        };

        // Projects
        prePopulatedTasksRef.add = {
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
    };

writePrepopulatedTasks();