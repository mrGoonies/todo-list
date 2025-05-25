let tasks = []
const taskList = document.getElementById('taskList')
const taskInput = document.getElementById('taskInput')
const totalTareas = document.getElementById('total-tareas')
const totalRealizadas = document.getElementById('total-realizadas')
const addTaskButton = document.getElementById('add-task-btn')
let taskId = 0


// Function to render tasks - I create a table to show the tasks ID - Task - status (i use check btn. If check btn is clicked the task) - actions (delete)
function renderTasks() {
    taskList.innerHTML = ''
    tasks.forEach(task => {
        const taskRow = document.createElement('tr')
        taskRow.innerHTML = `
            <td>${task.id}</td>
            <td>${task.text}</td>
            <td><input id="check-btn" type="checkbox" ${task.completed ? 'checked' : ''} data-id="${task.id}"></td>
            <td><button class="delete-btn" data-id="${task.id}"></button></td>
        `
        const checkBtn = taskRow.querySelector('#check-btn')
        const deleteBtn = taskRow.querySelector('.delete-btn')
        checkBtn.addEventListener('click', function () {
            const taskId = parseInt(checkBtn.getAttribute('data-id'))
            const task = tasks.find(task => task.id === taskId)
            task.completed = !task.completed
            renderTasks()
            totalTareas.textContent = `${tasks.length}`
            totalRealizadas.textContent = `${tasks.filter(task => task.completed).length}`
        })
        deleteBtn.addEventListener('click', function () {
            const taskId = parseInt(deleteBtn.getAttribute('data-id'))
            tasks = tasks.filter(task => task.id !== taskId)
            renderTasks()
            totalTareas.textContent = `${tasks.length}`
            totalRealizadas.textContent = `${tasks.filter(task => task.completed).length}`
        })
        
        taskList.appendChild(taskRow)
    })
}

addTaskButton.addEventListener('click', function () {
    const taskText = taskInput.value
    if (taskText) {
        const task = {
            id: taskId++,
            text: taskText,
            completed: false
        }
        tasks.push(task)
        console.log(tasks)
        renderTasks()
        taskInput.value = ''
        totalTareas.textContent = `${tasks.length}`
        totalRealizadas.textContent = `${tasks.filter(task => task.completed).length}`

        totalTareas.textContent = `${tasks.length}`
        totalRealizadas.textContent = `${tasks.filter(task => task.completed).length}`
    }
})

console.log(tasks)
