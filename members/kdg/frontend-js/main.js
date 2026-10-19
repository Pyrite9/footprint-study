const taskForm = document.querySelector('#task-form');

const titleInput = taskForm.elements.title;
const periodInput = taskForm.elements.period;

const list = document.querySelector('#list');
async function loadTasks() {
    const response = await fetch('./tasks.json');

    if (response.ok) {
        let tasks = await response.json();
        tasks.forEach((task) => {liAppend(task.title, task.period)});
    }
}

loadTasks();







taskForm.addEventListener('submit', function (event) {
    event.preventDefault();
    if (titleInput.value.trim() =="" || periodInput.value.trim() == "") {
        alert("공백");
        return;
    }
    liAppend(titleInput.value.trim(), periodInput.value.trim());
    titleInput.value = "";
    periodInput.value = "";

})

function liAppend(title, period) {
    const newLi = document.createElement("li");

    newLi.textContent = `${title} (${period})`;

    list.appendChild(newLi);



}
