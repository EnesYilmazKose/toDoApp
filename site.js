const form = document.querySelector('#addTaskForm');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let itemIndex = 1;
let items;
let updatedLi;
const key ="tasks";

loadItems();
eventListeners();
function eventListeners() {
    form.addEventListener("submit", addOrUpdateItem);
    btnDeleteAll.addEventListener('click', deleteAllItem);
    taskList.addEventListener('click', taskListClick);
}
function taskListClick(e) {
    if (e.target.className === 'bi bi-x-circle') {
        e.target.parentElement.parentElement.remove();
    } else if (e.target.className === 'bi bi-pencil') {
        input.value = e.target.parentElement.parentElement.textContent;
        updatedLi = e.target.parentElement.parentElement;
    }
}
function deleteAllItem(e) {
    let tasks = document.querySelectorAll('#task-list li');
    if (tasks.length != 0 && confirm('Are you sure?')) {
        taskList.innerHTML = '';
        localStorage.clear();
    }
}
function addOrUpdateItem(e) {
    e.preventDefault();

    if (input.value === '') {
        alert('Please type a task');
        return;
    } else if(updatedLi) {
        updatedLi.textContent= input.value;
        addIcon(updatedLi);
        updatedLi = null;
    } else {
        createItem(input.value);
        setItemToLStorage(input.value);

        input.value = '';
    }
}
function addIcon(liElement) {
    const deleteTaskButton = document.createElement('a');
    deleteTaskButton.classList = 'delete-item float-end';
    deleteTaskButton.setAttribute('href', '#');
    deleteTaskButton.innerHTML = '<i class="bi bi-x-circle"></i>';

    liElement.appendChild(deleteTaskButton);

    const updateTaskButton = document.createElement('a');
    updateTaskButton.classList = 'update-item float-end px-2';
    updateTaskButton.setAttribute('href', '#');
    updateTaskButton.innerHTML = '<i class="bi bi-pencil"></i>';

    liElement.appendChild(updateTaskButton);
}
function createItem(text) {
    const li = document.createElement('li');

    li.classList = itemIndex % 2 == 1 ? 'list-group-item' : 'list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(text));

    addIcon(li);
    taskList.appendChild(li);

    itemIndex++;
}
function setItemToLStorage(text) {
    items =getItemsFromLStorage();
    items.push(text); 
    localStorage.setItem(key, JSON.stringify(items));
}
function getItemsFromLStorage() {
    if (localStorage.getItem(key) === null) {
        items=[];
    } else {
        items = JSON.parse(localStorage.getItem(key));
    }

    return items;
    
}
function loadItems() {
    items = getItemsFromLStorage();    
    items.forEach((toDo) => createItem(toDo));
}
