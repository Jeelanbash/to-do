document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const filterAll = document.getElementById('filterAll');
    const filterCompleted = document.getElementById('filterCompleted');
    const filterIncomplete = document.getElementById('filterIncomplete');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.textContent = task.text;
            taskItem.className = task.completed ? 'completed' : '';
            taskItem.addEventListener('click', () => toggleTaskCompletion(index));
            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'deleteBtn';
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent triggering completion toggle
                deleteTask(index);
            });
            
            taskItem.appendChild(deleteBtn);
            taskList.appendChild(taskItem);
        });
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task');
            return;
        }
        tasks.push({ text: taskText, completed: false });
        saveTasks();
        taskInput.value = '';
        renderTasks();
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    function toggleTaskCompletion(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function filterTasks(filter) {
        let filteredTasks = tasks;
        if (filter === 'completed') {
            filteredTasks = tasks.filter(task => task.completed);
        } else if (filter === 'incomplete') {
            filteredTasks = tasks.filter(task => !task.completed);
        }
        taskList.innerHTML = '';
        filteredTasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.textContent = task.text;
            taskItem.className = task.completed ? 'completed' : '';
            taskItem.addEventListener('click', () => toggleTaskCompletion(index));
            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'deleteBtn';
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteTask(index);
            });
            
            taskItem.appendChild(deleteBtn);
            taskList.appendChild(taskItem);
        });
    }

    addTaskBtn.addEventListener('click', addTask);
    filterAll.addEventListener('click', () => filterTasks('all'));
    filterCompleted.addEventListener('click', () => filterTasks('completed'));
    filterIncomplete.addEventListener('click', () => filterTasks('incomplete'));

    renderTasks(); // Initial render
});
