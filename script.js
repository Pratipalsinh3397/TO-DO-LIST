let todos = JSON.parse(localStorage.getItem('todos')) || []
const todoInput = document.getElementById('todo-text')
const addButton = document.getElementById('add')
const todoList = document.getElementById('todo-list')
const removeAll = document.getElementById('removeAll')
let spanOne = document.querySelector('.spanOne')

document.addEventListener('DOMContentLoaded',function(){
    addButton.addEventListener('click',addTodo);
    todoInput.addEventListener('keydown',function(e){
        if(e.key === "Enter"){
            e.preventDefault()
            addTodo()
        }
    })
    displayTodo()
})


function addTodo(){
    let taskText = todoInput.value.trim();
    if(taskText !== ""){
        todos.push({
            text: taskText,
            check: false,
        })
        setData()
        todoInput.value=""
        displayTodo()
    }
}

function displayTodo(){
    todoList.innerHTML = ""
    todos.forEach(function(todo,index) {
        todoList.innerHTML += `<li id="list" >
                <input type="checkbox" class="checkbox" id="checkbox-${index}" ${todo.check ? "checked" : ""}>
                <span id="text-${index}" class="${todo.check ? "complete" : ""}"}>${todo.text}</span>
                <i class="fa-regular fa-trash-can" id="icon-${index}"></i>
            </li>`;
            
            toggleTodo()
            deleteAll()
            deleteOnetodo()
    });
    spanOne.innerHTML= todos.length
    if(todos.length >= 4){
        todoList.style.height = "240px"
    }else{
        todoList.style.height = "fit-content"
    }
}

function toggleTodo(){
    let checkboxes = document.querySelectorAll('.checkbox')
    checkboxes.forEach(function(checkbox,index){
        checkbox.addEventListener('change',function(){
            todos[index].check = !todos[index].check
            setData()
            displayTodo()
        })
    }) 
}

function deleteOnetodo(){
    let icons = document.querySelectorAll('.fa-trash-can')
    icons.forEach(function(icon,index){
        icon.addEventListener('click',function(){
            todos.splice(index,1)
            setData()
            displayTodo()
        })
    })
}

function deleteAll(){
    removeAll.addEventListener('click',function(){
        todos = []
        setData()
        displayTodo()
    })
}

function setData(){
    localStorage.setItem('todos',JSON.stringify(todos))
}
