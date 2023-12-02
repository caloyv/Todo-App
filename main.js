import navBar from './navBar.js'

let navState = [
    {
        nav: "all",
        state: true
    },
    {
        nav: "pending",
        state: false
    },
    {
        nav: "complete",
        state: false
    },
]

navBar(navState, showNewTask);

const newTask = document.querySelector('.new-task')
const mainTaskContainer = document.querySelector('.tasks-list');

if (JSON.parse(localStorage.getItem('tasks')) === null){
    localStorage.setItem('tasks', JSON.stringify([]))
}
let tasksLocal = JSON.parse(localStorage.getItem('tasks'))


let editState = false;
let optionParentID
let taskValue

newTask.addEventListener('keyup', (event) => {
    if(event.key === "Enter") {
        const newTaskObj = {
            id: Date.now(),
            newTaskInfo: event.target.value,
            state: "pending"
        }
        if(event.target.value === ""){

        }else {
            if(editState) {
                let taskIndex = tasksLocal.findIndex(task => task.id === optionParentID)
                tasksLocal[taskIndex].newTaskInfo = event.target.value
                localStorage.setItem('tasks', JSON.stringify(tasksLocal))
                editState = false
                event.target.value = ""
                showNewTask()
            }else {
                tasksLocal = JSON.parse(localStorage.getItem('tasks'))
                tasksLocal.push(newTaskObj)
                localStorage.setItem('tasks', JSON.stringify(tasksLocal))
                event.target.value = ""
                showNewTask()
            }
        }
    }    
});


function showNewTask() {
    let taskVar = ""
    let taskcont = JSON.parse(localStorage.getItem('tasks'))
    let msg = "You have no task"
    taskcont.forEach(task => {
        if(navState[0].state){
            taskVar +=`<div class="task-list" id='${task.id}'>
                        <div class="task-container ">
                            <input id="${task.id + 1}" type="checkbox" ${task.state === "complete" && "Checked"} name="finished" class="checkbox">
                            <label for="${task.id + 1}" class="task ${task.state === "complete" && "crossed"}">${task.newTaskInfo}</label>
                        </div>
                        <div class="option-container">
                            <p class="edit-btn"><img src="./edit-btn.png" alt="edit icon"/></p>
                            <p class="delete-btn"><img src="./delete-btn.png" alt="delete icon"/></p>
                        </div>
                    </div>`
        }
        else if(navState[1].state){
            if(task.state === "pending"){
            taskVar +=`<div class="task-list" id='${task.id}'>
                        <div class="task-container ">
                            <input id="${task.id + 1}" type="checkbox" ${task.state === "complete" && "Checked"} name="finished" class="checkbox">
                            <label for="${task.id + 1}" class="task ${task.state === "complete" && "crossed"}">${task.newTaskInfo}</label>
                        </div>
                        <div class="option-container">
                            <p class="edit-btn"><img src="./edit-btn.png" alt="edit icon"/></p>
                            <p class="delete-btn"><img src="./delete-btn.png" alt="delete icon"/></p>
                        </div>
                    </div>`
                   
            }
            msg = "You have no pending task."
        }
        else if(navState[2].state){
            if(task.state === "complete"){
            taskVar +=`<div class="task-list" id='${task.id}'>
                        <div class="task-container ">
                            <input id="${task.id + 1}" type="checkbox" ${task.state === "complete" && "Checked"} name="finished" class="checkbox">
                            <label for="${task.id + 1}" class="task ${task.state === "complete" && "crossed"}">${task.newTaskInfo}</label>
                        </div>
                        <div class="option-container">
                            <p class="edit-btn"><img src="./edit-btn.png" alt="edit icon"/></p>
                            <p class="delete-btn"><img src="./delete-btn.png" alt="delete icon"/></p>
                        </div>
                    </div>`
            
            }
            msg = "You have no complete task."
        }
    })
    mainTaskContainer.innerHTML = taskVar == "" ? msg : taskVar
}

showNewTask()

mainTaskContainer.addEventListener('click',e => {
    if (e.target.tagName === "INPUT") {

        let parentID = e.target.parentElement.parentElement.id;
        if(e.target.checked) {
            e.target.nextSibling.nextSibling.classList.add('crossed')
            tasksLocal.map(task => parentID == task.id ? task.state = "complete": "")
            localStorage.setItem('tasks', JSON.stringify(tasksLocal))
            showNewTask()
            
        }else {
            e.target.nextSibling.nextSibling.classList.remove('crossed')
            tasksLocal.map(task => parentID == task.id ? task.state = "pending": "")
            localStorage.setItem('tasks', JSON.stringify(tasksLocal))
            showNewTask()
        }
    }


    if (e.target.parentElement.className == "edit-btn") {
        console.log(e.target.className)
        optionParentID = Number(e.target.parentElement.parentElement.parentElement.id)
        taskValue = e.target.parentElement.parentElement.parentElement.children[0].children[1]
        let taskInfo = taskValue.textContent
        newTask.value = taskInfo;
        editState = true
        newTask.focus()
    }
    if (e.target.parentElement.className == "delete-btn") {
        optionParentID = Number(e.target.parentElement.parentElement.parentElement.id)
        taskValue = e.target.parentElement.parentElement.parentElement.children[0].children[1]
        editState = false;
        tasksLocal.map(task => {
            
            if (optionParentID === task.id) {
                let index = tasksLocal.findIndex(task => task.id === optionParentID)
                let updateTask = tasksLocal.splice(index, 1)
                if(index === 0 && JSON.parse(localStorage.getItem('tasks'))[1] === undefined) {
                    tasksLocal.shift();
                    localStorage.setItem('tasks',JSON.stringify(tasksLocal))
                    showNewTask()
                }else {
                    localStorage.setItem('tasks',JSON.stringify(tasksLocal))
                    showNewTask()
                }  
            }
        })
    }
})

const clearBtn = document.querySelector('.clear-all');

clearBtn.addEventListener('click', () => {
    localStorage.setItem('tasks',JSON.stringify([]))
    showNewTask()
})

