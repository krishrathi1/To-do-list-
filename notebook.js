document.getElementById('add-task').addEventListener('click', function() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
    }
    updateProgress();
});

function addTask(taskText) {
    const tasksList = document.getElementById('tasks');
    const li = document.createElement('li');
    li.textContent = taskText;
    li.draggable = true;
    li.addEventListener('dragstart', dragStart);
    li.addEventListener('dragover', dragOver);
    li.addEventListener('drop', drop);
    li.addEventListener('click', function() {
        this.classList.toggle('completed');
        updateProgress();
    });
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete';
    deleteButton.addEventListener('click', function() {
        tasksList.removeChild(this.parentElement);
        updateProgress();
    });
    li.appendChild(deleteButton);
    tasksList.appendChild(li);
    updateProgress();
}

function updateTime() {
    const now = new Date();
    const formattedTime = now.toLocaleString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
    document.getElementById('current-time').textContent = formattedTime;
}

function updateProgress() {
    const tasks = document.querySelectorAll('#tasks li');
    const completedTasks = document.querySelectorAll('#tasks li.completed');
    const percent = tasks.length ? (completedTasks.length / tasks.length) * 100 : 0;
    document.getElementById('progress').textContent = `Progress: ${percent.toFixed(2)}%`;
}

let dragged;

function dragStart(event) {
    dragged = event.target;
    event.target.style.opacity = 0.5;
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    if (event.target.tagName === 'LI' && event.target !== dragged) {
        const tasksList = document.getElementById('tasks');
        tasksList.insertBefore(dragged, event.target.nextSibling);
        dragged.style.opacity = 1;
    }
}

setInterval(updateTime, 1000);
updateTime();
updateProgress();