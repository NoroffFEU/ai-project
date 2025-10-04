import { getFromLocalStorage } from "../localStorage.js";

/**
 * Deletes an existing task via API.
 * Sends a DELETE request to the API endpoint with authentication headers.
 *
 * @param {string|number} taskId - The unique identifier of the task to delete
 *
 * @returns {Promise<void>} Promise that resolves when deletion is successful
 * @throws {Error} Throws error if deletion fails or API returns non-ok response
 *
 * @example
 * // Delete a task by ID
 * await deleteTask("task-123");
 * await deleteTask(123);
 */
export async function deleteTask(taskId) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getFromLocalStorage("accessToken")}`,
      "X-Noroff-API-Key": "YOUR API KEY HERE", // Replace with your actual API key
    },
  };

  const response = await fetch(`YOUR_API_ENDPOINT/${taskId}`, options); // Replace with actual API endpoint
  if (!response.ok) {
    throw new Error("Deleting task failed.");
  }
  return;
}
