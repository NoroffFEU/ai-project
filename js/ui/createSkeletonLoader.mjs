/**
 * Creates skeleton loader items (returns array of li elements, not wrapped in container)
 * @param {number} count - The number of skeleton items to create
 * @returns {DocumentFragment} - Fragment containing skeleton items
 */
export function createSkeletonLoader(count = 5) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const skeletonItem = createSkeletonItem();
    fragment.appendChild(skeletonItem);
  }

  return fragment;
}

/**
 * Creates a single skeleton task item matching the task board Layout
 * @returns {HTMLElement} - The skeleton task item element.
 */
function createSkeletonItem() {
  const li = document.createElement("li");
  // Match the EXACT classes from createTaskBoardItem
  li.className =
    "list-group-item d-flex justify-content-between align-items-center bg-black bg-opacity-10 mb-2 rounded border-0 skeleton-item";
  li.setAttribute("aria-busy", "true");

  //Left side
  const leftDiv = document.createElement("div");
  leftDiv.className = "d-flex align-items-center flex-grow-1";

  //Checkbox placeholder
  const checkboxPlaceholder = document.createElement("span");
  checkboxPlaceholder.className = "placeholder placeholder-glow rounded me-2";
  checkboxPlaceholder.style.width = "20px";
  checkboxPlaceholder.style.height = "20px";

  //Text placeholder
  const textPlaceholder = document.createElement("span");
  textPlaceholder.className = "placeholder placeholder-glow col-6";

  leftDiv.appendChild(checkboxPlaceholder);
  leftDiv.appendChild(textPlaceholder);

  //Right side
  const buttonPlaceholder = document.createElement("span");
  buttonPlaceholder.className = "placeholder placeholder-glow rounded";
  buttonPlaceholder.style.width = "24px";
  buttonPlaceholder.style.height = "24px";

  li.appendChild(leftDiv);
  li.appendChild(buttonPlaceholder);

  return li;
}

/**
 * Creates a skeleton loader for weekly view tasks
 * @param {number} count - Number of skeleton items to create
 * @returns {DocumentFragment} Fragment with skeleton items
 */
export function createWeeklySkeletonLoader(count = 7) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const skeletonItem = createWeeklySkeletonItem();
    fragment.appendChild(skeletonItem);
  }

  return fragment;
}

/**
 * Creates a single skeleton item for weekly view
 * @returns {HTMLElement} Single skeleton item
 */
function createWeeklySkeletonItem() {
  const li = document.createElement("li");
  li.className =
    "list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2 skeleton-item";
  li.setAttribute("aria-busy", "true");

  const leftDiv = document.createElement("div");
  leftDiv.className = "d-flex align-items-center flex-grow-1";

  const checkboxPlaceholder = document.createElement("span");
  checkboxPlaceholder.className = "placeholder placeholder-glow rounded me-2";
  checkboxPlaceholder.style.width = "20px";
  checkboxPlaceholder.style.height = "20px";

  const textPlaceholder = document.createElement("span");
  textPlaceholder.className = "placeholder placeholder-glow col-5";

  leftDiv.appendChild(checkboxPlaceholder);
  leftDiv.appendChild(textPlaceholder);

  const iconPlaceholder = document.createElement("span");
  iconPlaceholder.className = "placeholder placeholder-glow rounded";
  iconPlaceholder.style.width = "16px";
  iconPlaceholder.style.height = "16px";

  li.appendChild(leftDiv);
  li.appendChild(iconPlaceholder);

  return li;
}
