import { deleteTask } from "../api/deleteTask.mjs";
import { fetchTasks } from "../api/fetchTasks.mjs";
import { isLoggedIn } from "../auth/isLoggedIn.mjs";
import { displayError } from "../ui/shared/displayMessage.mjs";
import {
  getFromLocalStorage,
  removeTaskFromLocalStorage,
} from "../utils/localStorage.mjs";

/**
 * Deletes a task using API (logged in users) or localStorage (guests).
 * Updates UI and task counters after deletion.
 *
 * @param {string|number} taskId - The task ID to delete
 * @returns {Promise<void>}
 */
export async function handleDeleteTask(taskId) {
  let tasks = [];

  if (isLoggedIn()) {
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
