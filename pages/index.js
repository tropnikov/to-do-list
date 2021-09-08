const addForm = document.querySelector('.add-task-form');
const taskTemplate = document.querySelector('.task-template').content;
let taskList = [];

function createTask(taskText, done = false) {
  const listItem = taskTemplate.cloneNode(true);
  listItem.querySelector('.task').textContent = taskText;
  if (done) {
    listItem.querySelector('input').checked = done;
    listItem.querySelector('.task').classList.add('completed');
  }
  listItem.querySelector('.delete-btn').addEventListener('click', (evt) => {
    handleTaskDelete(evt);
  });
  listItem
    .querySelector('input')
    .addEventListener('click', (evt) => handleTaskCompletion(evt));
  return listItem;
}

function addTask(taskElement) {
  document.querySelector('.task-list').append(taskElement);
}

function saveToStorage(taskText, done = false) {
  const taskObj = { title: taskText, done: done };
  taskList.push(taskObj);
  localStorage.setItem('tasks', JSON.stringify(taskList));
}

function renderFromStorage() {
  taskList = JSON.parse(localStorage.getItem('tasks')) || [];
  taskList.forEach((item) => {
    addTask(createTask(item.title, item.done));
  });
}

function rewriteStorage() {
  localStorage.removeItem('tasks');
  taskList = [];
  document.querySelectorAll('.task').forEach((item) => {
    saveToStorage(item.textContent, item.classList.contains('completed'));
  });
}

const handleTaskCompletion = (evt) => {
  const task = evt.target.nextElementSibling;
  task.classList.toggle('completed');
  rewriteStorage();
};

const handleTaskDelete = (evt) => {
  //TODO: maybe rewrite later
  evt.target.parentNode.remove();
  rewriteStorage();
};

function handleTaskSubmit(e) {
  e.preventDefault();
  const textInput = addForm.elements[0].value;
  if (textInput) {
    addTask(createTask(textInput));
    saveToStorage(textInput, false);
    addForm.reset();
  }
}

addForm.addEventListener('submit', handleTaskSubmit);

renderFromStorage();
