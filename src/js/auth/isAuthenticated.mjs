/**
 * Checks if the user is currently authenticated.
 * Verifies authentication by checking for the presence of an access token in localStorage.
 *
 * @returns {boolean} True if user has a valid access token, false otherwise
 *
 * @example
 * // Check if user is logged in
 * if (isAuthenticated()) {
 *   console.log('User is authenticated');
 * } else {
 *   console.log('User is not authenticated');
 * }
 */
export function isAuthenticated() {
  return !!localStorage.getItem("accessToken");
}
