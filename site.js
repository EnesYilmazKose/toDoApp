const form = document.querySelector('#addTaskForm');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let itemIndex = 1;
let items;
eventListeners();
function eventListeners() {
    form.addEventListener("submit", addNewItem);
    btnDeleteAll.addEventListener('click', deleteAllItem);
    taskList.addEventListener('click', deleteItem);
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
function addNewItem(e) {
    e.preventDefault();

    if (input.value === '') {
        alert('Please type a task');
        return;
    }

    const li = document.createElement('li');

    li.classList = itemIndex % 2 == 1 ? 'list-group-item' : 'list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(input.value));

    const a = document.createElement('a');
    a.classList = 'delete-item float-end';
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="bi bi-x-circle"></i>';

    li.appendChild(a);

    taskList.appendChild(li);
    input.value = '';
    itemIndex++;
}