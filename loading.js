// Get elements
const stream1Tasks = document.querySelectorAll('#stream1 .task-item');
const stream2Tasks = document.querySelectorAll('#stream2 .task-item');
const stream3Tasks = document.querySelectorAll('#stream3 .task-item');
const progressBar = document.getElementById('progressBar');
const cancelBtn = document.getElementById('cancelBtn');

let currentProgress = 0;
const totalTasks = stream1Tasks.length + stream2Tasks.length + stream3Tasks.length;
let completedTasks = 0;
let stream1Interval, stream2Interval, stream3Interval;

// Cancel button click handler
cancelBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to cancel the analysis and return to home?')) {
        // Clear all intervals
        clearInterval(stream1Interval);
        clearInterval(stream2Interval);
        clearInterval(stream3Interval);
        
        // Add transition animation
        document.getElementById('loadingContent').classList.add('slide-out');
        
        setTimeout(() => {
            window.location.href = 'home.html';
        }, 500);
    }
});

// Count initially completed tasks
document.querySelectorAll('.task-item.completed').forEach(() => {
    completedTasks++;
});

// Update progress bar
function updateProgress() {
    currentProgress = (completedTasks / totalTasks) * 100;
    progressBar.style.width = currentProgress + '%';
    
    // Redirect to result page when complete
    if (currentProgress >= 100) {
        setTimeout(() => {
            document.getElementById('loadingContent').classList.add('slide-out');
            
            setTimeout(() => {
                window.location.href = 'result.html';
            }, 500);
        }, 500);
    }
}

// Animate task completion - directly complete the task
function completeTask(taskElement) {
    taskElement.classList.remove('pending', 'processing');
    taskElement.classList.add('completed');
    taskElement.textContent = taskElement.textContent.replace('○', '✓');
    completedTasks++;
    updateProgress();
}

// Calculate interval timing for 30 seconds total
// Stream 1: 11 remaining tasks, interval = 30000ms / 11 ≈ 2700ms
// Stream 2: 10 remaining tasks, interval = 30000ms / 10 = 3000ms  
// Stream 3: 12 remaining tasks, interval = 30000ms / 12 = 2500ms

// Simulate stream 1 progress (start from index 3, which is the first "processing" task)
let stream1Index = 3;
stream1Interval = setInterval(() => {
    if (stream1Index < stream1Tasks.length) {
        completeTask(stream1Tasks[stream1Index]);
        stream1Index++;
    } else {
        clearInterval(stream1Interval);
    }
}, 2700);

// Simulate stream 2 progress (start from index 4, which is the first "processing" task)
let stream2Index = 4;
stream2Interval = setInterval(() => {
    if (stream2Index < stream2Tasks.length) {
        completeTask(stream2Tasks[stream2Index]);
        stream2Index++;
    } else {
        clearInterval(stream2Interval);
    }
}, 3000);

// Simulate stream 3 progress (start from index 2, which is the first "processing" task)
let stream3Index = 2;
stream3Interval = setInterval(() => {
    if (stream3Index < stream3Tasks.length) {
        completeTask(stream3Tasks[stream3Index]);
        stream3Index++;
    } else {
        clearInterval(stream3Interval);
    }
}, 2500);

// Initialize progress
updateProgress();

// Page transition animation on load
window.addEventListener('load', () => {
    document.getElementById('loadingContent').classList.add('slide-in');
});
