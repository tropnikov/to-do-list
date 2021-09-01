const addForm = document.querySelector('.add-task-form');
const taskTemplate = document.querySelector('.task-template').content;

const handleTaskSubmit = function (e) {
    e.preventDefault();
    const textInput = addForm.elements[0].value;
    if (textInput) {
        const listItem = taskTemplate.cloneNode(true);
        listItem.querySelector('.task').textContent = textInput;
        document.querySelector('.task-list').append(listItem);
        addForm.reset();
    }
}
addForm.addEventListener('submit', handleTaskSubmit);
