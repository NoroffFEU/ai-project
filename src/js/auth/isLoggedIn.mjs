/**
 * Checks if the user is currently logged in.
 * Verifies logged in status by checking for the presence of an access token in localStorage.
 *
 * @returns {boolean} True if user has a set access token, false otherwise
 *
 * @example
 * // Check if user is logged in
 * if (isLoggedIn()) {
 *   console.log('User is logged in');
 * } else {
 *   console.log('User is not logged in');
 * }
 */
export function isLoggedIn() {
  return !!localStorage.getItem("accessToken");
}
