import { closeAllDropdowns } from "./closeAllDropdowns.mjs";

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
