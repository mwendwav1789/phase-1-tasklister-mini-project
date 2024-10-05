class Task {
  constructor(description, priority) {
    this.description = description;
    this.priority = priority;
  }
}

class TaskList {
  constructor() {
    this.tasks = [];
  }

  createNewTask(description, priority) {
    const task = new Task(description, priority);
    this.tasks.push(task);
  }

  deleteTask(description) {
    this.tasks = this.tasks.filter((task) => task.description !== description);
  }

  renderTasks() {
    return this.tasks
      .map(
        (task) => `
      <li>
        ${task.description} - ${task.priority} 
        <button data-description="${task.description}">Delete</button>
      </li>
    `
      )
      .join("");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const taskList = new TaskList();

  const newTaskForm = document.getElementById("create-task-form");
  const newTaskDescription = document.getElementById("new-task-description");
  const newTaskPriority = document.getElementById("new-task-priority");
  const taskUl = document.getElementById("tasks");

  const renderApp = () => (taskUl.innerHTML = taskList.renderTasks());

  newTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const description = newTaskDescription.value.trim();
    const priority =
      newTaskPriority.options[newTaskPriority.selectedIndex].text; // Get the text of the selected option

    if (description) {
      taskList.createNewTask(description, priority);
      e.target.reset(); // Clear the input fields
      renderApp();
    }
  });

  taskUl.addEventListener("click", (e) => {
    if (e.target.nodeName === "BUTTON") {
      taskList.deleteTask(e.target.dataset.description);
      renderApp();
    }
  });
});
