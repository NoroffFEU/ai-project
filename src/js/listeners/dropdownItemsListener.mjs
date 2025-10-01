import { handleDeleteTask } from "../handlers/handleDeleteTask.mjs";
import { closeAllDropdowns } from "../utils/closeAllDropdowns.mjs";

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
