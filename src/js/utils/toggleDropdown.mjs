import { closeAllDropdowns } from "./closeAllDropdowns.mjs";

/**
 * Toggles the visibility of a dropdown menu and updates button state.
 * Closes other dropdowns when opening a new one.
 *
 * @param {HTMLElement} dropdownMenu - The dropdown menu element to toggle
 * @param {HTMLElement} button - The button that controls the dropdown
 * @returns {void}
 */
export function toggleDropdown(dropdownMenu, button) {
  const isCurrentlyVisible =
    dropdownMenu.classList.contains("show") &&
    !dropdownMenu.classList.contains("d-none");

  if (isCurrentlyVisible) {
    dropdownMenu.classList.remove("show");
    dropdownMenu.classList.add("d-none");
    button.setAttribute("aria-expanded", "false");
  } else {
    closeAllDropdowns();

    dropdownMenu.classList.add("show");
    dropdownMenu.classList.remove("d-none");
    button.setAttribute("aria-expanded", "true");
  }
}

document.addEventListener("click", (e) => {
  if (!e.target.closest(".dropdown")) {
    closeAllDropdowns();
  }
});
