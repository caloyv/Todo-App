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
                console.log(taskIndex)
                console.log(tasksLocal)
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
                console.log(JSON.parse(localStorage.getItem('tasks')))
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
                            •••
                            <div class="option">
                                <p class="edit-btn">Edit</p>
                                <p class="delete-btn">Delete</p>
                            </div>
                        </div>
                    </div>`
        }else if(navState[1].state){
            if(task.state === "pending"){
            taskVar +=`<div class="task-list" id='${task.id}'>
                        <div class="task-container ">
                            <input id="${task.id + 1}" type="checkbox" ${task.state === "complete" && "Checked"} name="finished" class="checkbox">
                            <label for="${task.id + 1}" class="task ${task.state === "complete" && "crossed"}">${task.newTaskInfo}</label>
                        </div>
                        <div class="option-container">
                            •••
                            <div class="option">
                                <p class="edit-btn">Edit</p>
                                <p class="delete-btn">Delete</p>
                            </div>
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
                            •••
                            <div class="option">
                                <p class="edit-btn">Edit</p>
                                <p class="delete-btn">Delete</p>
                            </div>
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
    // console.log(e)
    if (e.target.tagName === "INPUT") {

        let parentID = e.target.parentElement.parentElement.id;
        if(e.target.checked) {
            e.target.nextSibling.nextSibling.classList.add('crossed')
            tasksLocal.map(task => parentID == task.id ? task.state = "complete": "")
            localStorage.setItem('tasks', JSON.stringify(tasksLocal))
            showNewTask()
            // console.log(JSON.parse(localStorage.getItem('tasks'))[0].state)
            // console.log(parentID)
            
        }else {
            e.target.nextSibling.nextSibling.classList.remove('crossed')
            tasksLocal.map(task => parentID == task.id ? task.state = "pending": "")
            localStorage.setItem('tasks', JSON.stringify(tasksLocal))
            // console.log(JSON.parse(localStorage.getItem('tasks'))[0].state)
            showNewTask()
        }
    }

    if(e.target.className === "option-container") {
        let parent = e.target.parentElement
        let children = parent.children;
        let arrayOptionChildren = Array.from(children)

        // console.log(children)

        arrayOptionChildren.forEach(child => {
            if(child.className === 'option-container'){
                let optionBtn = child.children[0]
                optionBtn.classList.toggle('active')
            } // Toggle active on and off
        })
    }

    

    if (e.target.textContent == "Edit") {
        optionParentID = Number(e.target.parentElement.parentElement.parentElement.id)
        taskValue = e.target.parentElement.parentElement.parentElement.children[0].children[1]
        let taskInfo = taskValue.textContent
        newTask.value = taskInfo;
        editState = true
        newTask.focus()
        // console.log(optionParentID)
    }
    if (e.target.textContent == "Delete") {
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
                    // console.log("index is running")
                }else {
                    localStorage.setItem('tasks',JSON.stringify(tasksLocal))
                    showNewTask()
                    // console.log("working2")
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

