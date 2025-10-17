export function addToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

export function getFromLocalStorage(key) {
  return localStorage.getItem(key);
}

/**
 * Gets a value from either localStorage or sessionStorage
 * @param {string} key - The key to retrieve
 * @returns {string|null} The value from storage, or null if not found
 */
export function getFromStorage(key) {
  return localStorage.getItem(key) || sessionStorage.getItem(key);
}

export function removeFromLocalStorage() {
  // Clear from both localStorage and sessionStorage
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userName");
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("userEmail");
  sessionStorage.removeItem("userName");
}

/**
 * Removes a specific task from localStorage by its ID.
 * Retrieves tasks from localStorage, filters out the task with matching ID,
 * and updates the stored tasks array.
 * @param {number|string} taskId - The unique identifier of the task to remove
 * @returns {void} No return value
 */
export function removeTaskFromLocalStorage(taskId) {
  const storedTasks = getFromLocalStorage("tasks");

  if (storedTasks) {
    let tasks = JSON.parse(storedTasks);
    tasks = tasks.filter((task) => {
      return task.id != Number(taskId);
    });

    addToLocalStorage("tasks", JSON.stringify(tasks));
  }
}
