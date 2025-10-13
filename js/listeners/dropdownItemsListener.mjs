import { handleDeleteTask } from "../handlers/handleDeleteTask.mjs";
import { closeAllDropdowns } from "../utils/closeAllDropdowns.mjs";

/**
 * Attaches click event listeners to dropdown menu items.
 * Handles edit and delete actions, then closes all dropdowns.
 *
 * @param {HTMLElement} dropdownMenu - The dropdown menu element
 * @returns {void}
 */
export function dropdownItemsListener(dropdownMenu) {
  const dropdownItems = dropdownMenu.querySelectorAll(".dropdown-item");

  dropdownItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();
      const taskId = item.dataset.taskId;
      const action = item.dataset.action;

      if (action === "edit") {
        // Handle edit action
      } else if (action === "delete") {
        handleDeleteTask(taskId);
      }

      closeAllDropdowns();
    });
  });
}
