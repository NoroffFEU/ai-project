import { getFromLocalStorage } from "../localStorage.js";

/**
 * Fetches all tasks from the API.
 * Sends a GET request to retrieve the user's tasks with authentication headers.
 *
 * @returns {Promise<Object>} Promise that resolves with the tasks data from API
 * @throws {Error} Throws error if fetching tasks fails or API returns non-ok response
 *
 * @example
 * // Fetch all tasks
 * const tasksData = await fetchTasks();
 * console.log(tasksData);
 */
export async function fetchTasks() {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getFromLocalStorage("accessToken")}`,
      "X-Noroff-API-Key": "YOUR API KEY HERE", // Replace with your actual API key
    },
  };

  const response = await fetch(`YOUR_API_ENDPOINT`, options); // Replace with actual API endpoint
  const json = await response.json();

  if (!response.ok) {
    throw new Error("Fetching tasks failed.");
  }
  return json;
}
