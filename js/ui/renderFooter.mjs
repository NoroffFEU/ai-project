import { createFooter } from "./createFooter.mjs";

export function renderFooter() {
  const container = document.querySelector("#footer-container");

  if (!container) {
    console.error("The footer container was not found");
    return;
  }

  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  container.appendChild(createFooter());
}
