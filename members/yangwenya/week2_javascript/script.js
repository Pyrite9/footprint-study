const taskList = document.querySelector("#taskList");
const taskForm = document.querySelector("#taskForm");
const titleInput = document.querySelector("#title");
const periodInput = document.querySelector("#period");

function renderTasks(tasks) {
  taskList.innerHTML = "";

  tasks.map((task) => {
    const li = document.createElement("li");
    li.textContent = `${task.title} - ${task.period}`;
    taskList.appendChild(li);
  });
}

fetch("./tasks.json")
  .then((response) => response.json())
  .then((tasks) => {
    renderTasks(tasks);

    taskForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const newTask = {
        title: titleInput.value,
        period: periodInput.value
      };

      tasks.push(newTask);
      renderTasks(tasks);

      taskForm.reset();
    });
  })
  .catch((error) => {
    console.error("과제 데이터를 불러오지 못했습니다.", error);
  });
