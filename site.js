const form = document.querySelector('#addTaskForm');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
const edit = document.querySelector('#edit');

let itemIndex = 1;
let items;
eventListeners();
function eventListeners() {
    form.addEventListener("submit", addNewItem);
    btnDeleteAll.addEventListener('click', deleteAllItem);
    taskList.addEventListener('click', deleteItem);
    taskList.addEventListener('click', editItem);
}

function addNewItem(e) {
    e.preventDefault();

    if (input.value === '') {
        alert('Please type a task');
        return;
    }

    const li = document.createElement('li');
    
    li.classList = itemIndex % 2 == 1 ? 'list-group-item' : 'list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(input.value));
    li.setAttribute('readonly','readonly');

    const a = document.createElement('a');
    a.classList = 'delete-item float-end';
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="bi bi-x-circle"></i>';

    const b = document.createElement('a');
    b.classList = 'edit-item float-end';
    b.setAttribute('href', '#');
    b.innerHTML = '<i class="bi bi-pencil"></i>';
    b.setAttribute('style', 'padding-right: 10px');
    
    li.appendChild(a);
    li.appendChild(b);

    taskList.appendChild(li);
    input.value = '';
    itemIndex++;
}

function deleteItem(e) {
    if (e.target.className === 'bi bi-x-circle') {
        e.target.parentElement.parentElement.remove();
    }
}
function deleteAllItem(e) {
    let tasks = document.querySelectorAll('#task-list li');
    if (tasks.length != 0 && confirm('Are you sure?')) {

        taskList.innerHTML = '';
    }
}

function editItem(e) {
    if (e.target.className === 'bi bi-pencil') {
        let text;
        let editedTask = prompt("Please edit your task:", "");
        if (editedTask == null || editedTask == "") {
            text = "User cancelled the prompt.";
        } else {
  
            const a = document.createElement('a');
            a.classList = 'delete-item float-end';
            a.setAttribute('href', '#');
            a.innerHTML = '<i class="bi bi-x-circle"></i>';

            const b = document.createElement('a');
            b.classList = 'edit-item float-end';
            b.setAttribute('href', '#');
            b.innerHTML = '<i class="bi bi-pencil"></i>';
            b.setAttribute('style', 'padding-right: 10px');

            text = editedTask;
            e.target.parentElement.parentElement.innerHTML = text;
            e.target.appendChild(a);
            e.target.appendChild(b);

            taskList.appendChild(e.target);
            input.value = '';
            itemIndex++;
        }
        
        
    }
    
      
}