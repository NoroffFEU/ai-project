import { updateTaskCompletedHandler } from "../handlers/updateTaskCompletedHandler.mjs";

/**
 * Attaches change event listeners to all task checkboxes on the page.
 * When a checkbox is toggled, it updates the task's completion status in localStorage or via API.
 */
export function taskCheckboxListener() {
  const taskCheckboxes = document.querySelectorAll(".task-checkbox");
  taskCheckboxes.forEach((taskCheckbox) => {
    taskCheckbox.addEventListener("change", () => {
      const taskId = taskCheckbox.dataset.taskId;
      const isCompleted = taskCheckbox.checked;

      updateTaskCompletedHandler(taskId, isCompleted);
    });
  });
}
