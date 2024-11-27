const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const taskCounter = document.getElementById('taskCounter');
const clearTasksBtn = document.getElementById('clearTasks');

// Load tasks from local storage
document.addEventListener('DOMContentLoaded', loadTasks);

// Function to update the task counter
function updateTaskCounter() {
    const count = taskList.children.length;
    taskCounter.textContent = `Tasks: ${count}`;
}

// Function to create a new task element
function createTaskElement(taskText) {
    const li = document.createElement('li');

    // Task text
    const span = document.createElement('span');
    span.textContent = taskText;
    span.addEventListener('click', () => {
        li.classList.toggle('completed');
        saveTasks();
    });

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        taskList.removeChild(li);
        saveTasks();
        updateTaskCounter();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
    updateTaskCounter();
}

// Save tasks to local storage
function saveTasks() {
    const tasks = Array.from(taskList.children).map(task => ({
        text: task.querySelector('span').textContent,
        completed: task.classList.contains('completed')
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.classList.toggle('completed', task.completed);
        createTaskElement(task.text);
    });
}

// Handle form submission
taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        createTaskElement(taskText);
        saveTasks();
        taskInput.value = '';
    }
});

// Clear all tasks
clearTasksBtn.addEventListener('click', () => {
    taskList.innerHTML = '';
    saveTasks();
    updateTaskCounter();
});
