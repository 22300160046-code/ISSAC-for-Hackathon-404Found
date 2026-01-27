// Simulate dynamic loading process with 30 seconds duration
const stream1Tasks = document.querySelectorAll('#stream1 .task-item');
const stream2Tasks = document.querySelectorAll('#stream2 .task-item');
const stream3Tasks = document.querySelectorAll('#stream3 .task-item');
const progressBar = document.getElementById('progressBar');

let currentProgress = 0;
const totalTasks = stream1Tasks.length + stream2Tasks.length + stream3Tasks.length;
let completedTasks = 0;

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
            window.location.href = 'result.html';
        }, 500);
    }
}

// Animate task completion
function completeTask(taskElement) {
    taskElement.classList.remove('pending', 'processing');
    taskElement.classList.add('completed');
    taskElement.textContent = taskElement.textContent.replace('○', '✓');
    completedTasks++;
    updateProgress();
}

// Calculate interval timing for 30 seconds total
// Each stream has ~13 tasks, we want to complete in ~30 seconds
// 30000ms / 13 tasks ≈ 2300ms per task (with some variation)

// Simulate stream 1 progress
let stream1Index = 3; // Start from first pending task
const stream1Interval = setInterval(() => {
    if (stream1Index < stream1Tasks.length) {
        const task = stream1Tasks[stream1Index];
        if (task.classList.contains('processing')) {
            completeTask(task);
        } else if (task.classList.contains('pending')) {
            task.classList.remove('pending');
            task.classList.add('processing');
        }
        stream1Index++;
    } else {
        clearInterval(stream1Interval);
    }
}, 2200);

// Simulate stream 2 progress (slightly different timing)
let stream2Index = 4;
const stream2Interval = setInterval(() => {
    if (stream2Index < stream2Tasks.length) {
        const task = stream2Tasks[stream2Index];
        if (task.classList.contains('processing')) {
            completeTask(task);
        } else if (task.classList.contains('pending')) {
            task.classList.remove('pending');
            task.classList.add('processing');
        }
        stream2Index++;
    } else {
        clearInterval(stream2Interval);
    }
}, 2400);

// Simulate stream 3 progress (slightly different timing)
let stream3Index = 2;
const stream3Interval = setInterval(() => {
    if (stream3Index < stream3Tasks.length) {
        const task = stream3Tasks[stream3Index];
        if (task.classList.contains('processing')) {
            completeTask(task);
        } else if (task.classList.contains('pending')) {
            task.classList.remove('pending');
            task.classList.add('processing');
        }
        stream3Index++;
    } else {
        clearInterval(stream3Interval);
    }
}, 2600);

// Initialize progress
updateProgress();
