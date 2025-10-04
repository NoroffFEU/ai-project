export function addToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

export function getFromLocalStorage(key) {
  return localStorage.getItem(key);
}

export function removeFromLocalStorage() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userName");
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

