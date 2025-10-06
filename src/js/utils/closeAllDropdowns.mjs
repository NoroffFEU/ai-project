/**
 * Closes all open dropdown menus and updates button states.
 *
 * @returns {void}
 */
export function closeAllDropdowns() {
  const allDropdowns = document.querySelectorAll(".dropdown-menu");
  const allButtons = document.querySelectorAll(
    '.dropdown-button[aria-expanded="true"]',
  );

  allDropdowns.forEach((dropdown) => {
    dropdown.classList.remove("show");
    dropdown.classList.add("d-none");
  });

  allButtons.forEach((button) => {
    button.setAttribute("aria-expanded", "false");
  });
}
