import { isLoggedIn } from "../auth/isLoggedIn.mjs";
import { updateTaskCompleted } from "../api/updateTaskCompleted.mjs";
import { getFromLocalStorage } from "../utils/localStorage.mjs";
import { displayError } from "../ui/shared/displayMessage.mjs";

/**
 * Handles updating a task's completion status.
 * For logged-in users, updates via API. For guests, updates localStorage and applies visual styling.
 *
 * @param {string|number} taskId - The unique identifier of the task to update
 * @param {boolean} completed - The new completion status for the task
 * @returns {Promise<void>} Promise that resolves when the update is complete
 */
export async function updateTaskCompletedHandler(taskId, completed) {
  if (isLoggedIn()) {
    try {
      await updateTaskCompleted(taskId, completed);
      updateTaskCounters();
    } catch (error) {
      displayError("Error updating task:", error);
    }
  } else {
    try {
      const storedTasks = localStorage.getItem("tasks");
      if (storedTasks) {
        const tasks = JSON.parse(storedTasks);
        const taskToUpdate = tasks.find(
          (task) => task.id == parseInt(taskId) || task.id == taskId,
        );
        if (taskToUpdate) {
          taskToUpdate.completed = completed;
          localStorage.setItem("tasks", JSON.stringify(tasks));
          const taskElement = document.querySelector(
            "[data-task-id='" + taskId + "']",
          );
          if (completed) {
            taskElement.classList.add(
              "text-decoration-line-through",
              "fst-italic",
              "text-muted",
            );
          } else {
            taskElement.classList.remove(
              "text-decoration-line-through",
              "fst-italic",
              "text-muted",
            );
          }
          updateTaskCounters();
        } else {
          displayError(`Task not found.`);
        }
      }
    } catch (error) {
      displayError("Error updating task:", error);
    }
  }
}

/**
 * Updates the task counters displayed on the page
 */
function updateTaskCounters() {
  const storedTasks = getFromLocalStorage("tasks");
  if (storedTasks) {
    const tasks = JSON.parse(storedTasks);
    const completedTasks = tasks.filter((task) => task.completed);

    const completedElement = document.querySelector("#completed-tasks");
    const totalElement = document.querySelector("#total-tasks");

    if (completedElement) {
      completedElement.innerText = completedTasks.length;
    }
    if (totalElement) {
      totalElement.innerText = tasks.length;
    }
  }
}
