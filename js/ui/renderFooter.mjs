import { createFooter } from './createFooter.mjs';

/**
 * Footer container selector ID
 * @constant {string}
 */
const FOOTER_CONTAINER_ID = '#footer-container';

/**
 * Renders the footer by inserting footer content into the DOM
 * Clears existing content and appends new footer structure
 * @returns {void}
 */
export function renderFooter() {
  const container = document.querySelector(FOOTER_CONTAINER_ID);
  
  if (!container) {
     console.error("The footer container was not found");
    return;
  }
  
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  
  container.appendChild(createFooter());
}
