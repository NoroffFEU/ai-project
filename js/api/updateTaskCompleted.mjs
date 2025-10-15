import { getFromLocalStorage } from "../utils/localStorage.mjs";

/**
 * Updates the completion status of a task via API.
 * Sends a PUT request to update the task's completed status with authentication headers.
 *
 * @param {string|number} taskId - The unique identifier of the task to update
 * @param {boolean} completed - The new completion status for the task
 *
 * @returns {Promise<Object>} Promise that resolves with the updated task data from API
 * @throws {Error} Throws error if updating task fails or API returns non-ok response
 *
 * @example
 * Mark a task as completed
 * await updateTaskCompleted("task-123", true);
 *
 * Mark a task as not completed
 * await updateTaskCompleted("task-123", false);
 */
export async function updateTaskCompleted(taskId, completed) {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getFromLocalStorage("accessToken")}`,
      "X-Noroff-API-Key": "YOUR API KEY HERE", // Replace with your actual API key
    },
    body: JSON.stringify({
      completed: completed,
    }),
  };

  const response = await fetch(`YOUR_API_ENDPOINT/${taskId}`, options); // Replace with actual API endpoint
  const json = await response.json();

  if (!response.ok) {
    throw new Error("Updating task completion status failed.");
  }
  return json;
}
