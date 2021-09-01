const addForm = document.querySelector('.add-task-form');
const taskTemplate = document.querySelector('.task-template').content;

const handleTaskDelete = (evt) => {
  //TODO: maybe rewrite later
  evt.target.parentNode.remove();
};

function handleTaskSubmit(e) {
  e.preventDefault();
  const textInput = addForm.elements[0].value;
  if (textInput) {
    const listItem = taskTemplate.cloneNode(true);
    listItem.querySelector('.task').textContent = textInput;
    listItem.querySelector('.delete-btn').addEventListener('click', (evt) => {
      handleTaskDelete(evt);
    });
    document.querySelector('.task-list').append(listItem);
    addForm.reset();
  }
}

addForm.addEventListener('submit', handleTaskSubmit);
