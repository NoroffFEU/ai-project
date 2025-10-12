/**
 * Creates a task board item DOM element with checkbox, title, and dropdown menu.
 *
 * @param {Object} task - The task object containing id, title, and completed status
 * @returns {HTMLElement} The constructed list item element
 */
export function createTaskBoardItem(task) {
  const liElement = document.createElement("li");
  liElement.className =
    "list-group-item d-flex justify-content-between align-items-center bg-black bg-opacity-10 mb-2 rounded border-0";
  liElement.dataset.taskId = task.id;

  const taskInfoDiv = document.createElement("div");
  taskInfoDiv.className = "d-flex align-items-center";

  const checkboxContainer = document.createElement("div");

  const checkboxInput = document.createElement("input");
  checkboxInput.type = "checkbox";
  checkboxInput.className = "task-checkbox form-check-input me-2";
  checkboxInput.checked = task.completed;
  checkboxInput.dataset.taskId = task.id;
  checkboxContainer.appendChild(checkboxInput);

  const taskTitle = document.createElement("span");
  taskTitle.textContent = task.title;
  if (task.completed) {
    taskTitle.classList.add(
      "text-decoration-line-through",
      "fst-italic",
      "text-muted",
    );
  }

  taskInfoDiv.appendChild(checkboxContainer);
  taskInfoDiv.appendChild(taskTitle);

  const dropdownContainer = document.createElement("div");
  dropdownContainer.className = "dropdown";

  const dropdownButton = document.createElement("button");
  dropdownButton.className = "btn btn-sm dropdown-button";
  dropdownButton.type = "button";
  dropdownButton.setAttribute("aria-expanded", "false");
  dropdownButton.dataset.bsToggle = "dropdown";
  dropdownButton.dataset.taskId = task.id;

  const dropdownButtonIcon = document.createElement("i");
  dropdownButtonIcon.className = "fa-solid fa-ellipsis-vertical";
  dropdownButton.appendChild(dropdownButtonIcon);

  const dropdownMenu = document.createElement("ul");
  dropdownMenu.className = "dropdown-menu end-0";
  dropdownMenu.dataset.taskId = task.id;

  const editOption = document.createElement("li");
  editOption.className = "dropdown-item";
  editOption.dataset.taskId = task.id;
  editOption.dataset.action = "edit";
  editOption.role = "button";

  const editIcon = document.createElement("i");
  editIcon.className = "fa-solid fa-pen me-2";

  const editText = document.createElement("span");
  editText.textContent = "Edit";

  editOption.appendChild(editIcon);
  editOption.appendChild(editText);

  const deleteOption = document.createElement("li");
  deleteOption.className = "dropdown-item";
  deleteOption.dataset.taskId = task.id;
  deleteOption.dataset.action = "delete";
  deleteOption.role = "button";

  const deleteIcon = document.createElement("i");
  deleteIcon.className = "fa-solid fa-trash me-2";

  const deleteText = document.createElement("span");
  deleteText.textContent = "Delete";

  deleteOption.appendChild(deleteIcon);
  deleteOption.appendChild(deleteText);

  dropdownMenu.appendChild(editOption);
  dropdownMenu.appendChild(deleteOption);

  dropdownContainer.appendChild(dropdownButton);
  dropdownContainer.appendChild(dropdownMenu);

  liElement.appendChild(taskInfoDiv);
  liElement.appendChild(dropdownContainer);

  return liElement;
}
