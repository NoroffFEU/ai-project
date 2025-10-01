import { toggleDropdown } from "../utils/toggleDropdown.mjs";
import { dropdownItemsListener } from "./dropdownItemsListener.mjs";

export function dropdownButtonListener() {
  const dropdownButton = document.querySelectorAll(".dropdown-button");

  dropdownButton.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();

      const taskId = button.dataset.taskId;

      const dropdownMenu = document.querySelector(
        `.dropdown-menu[data-task-id="${taskId}"]`,
      );

      if (dropdownMenu) {
        toggleDropdown(dropdownMenu, button);
        dropdownItemsListener(dropdownMenu);
      }
    });
  });
}
