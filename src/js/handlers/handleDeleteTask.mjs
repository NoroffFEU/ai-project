import { deleteTask } from "../api/deleteTask.mjs";
import { fetchTasks } from "../api/fetchTasks.mjs";
import { displayError } from "../ui/shared/displayMessage.mjs";
import { isAuthenticated } from "../auth/isAuthenticated.mjs";
import {
  getFromLocalStorage,
  removeTaskFromLocalStorage,
} from "../localStorage.js";

export async function handleDeleteTask(taskId) {
  let tasks = [];

  if (isAuthenticated()) {
    try {
      await deleteTask(taskId);
      tasks = fetchTasks();
    } catch (error) {
      displayError(error);
    }
  } else {
    removeTaskFromLocalStorage(taskId);

    const storedTasks = getFromLocalStorage("tasks");
    if (storedTasks) {
      tasks = JSON.parse(storedTasks);
    }
  }

  const taskElement = document.querySelector(
    `.list-group-item[data-task-id="${taskId}"]`,
  );
  if (taskElement) {
    taskElement.remove();

    const completedTasks = tasks.filter((task) => task.completed);
    document.querySelector("#completed-tasks").innerText =
      completedTasks.length;
    document.querySelector("#total-tasks").innerText = tasks.length;
  }
}
