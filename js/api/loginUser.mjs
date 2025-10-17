/**
 * Authenticates a user by sending login credentials to the Noroff API.
 * 
 * @async
 * @param {Object} user - The user login credentials
 * @param {string} user.email - The user's email address
 * @param {string} user.password - The user's password
 * @returns {Promise<Object>} The API response containing user data and access token
 * @returns {Object} response.data - The user data object
 * @returns {string} response.data.accessToken - JWT token for authenticated requests
 * @returns {string} response.data.email - The authenticated user's email
 * @returns {string} response.data.name - The authenticated user's name
 * @throws {Error} Throws an error if the API request fails or credentials are invalid
 * 
 * @example
 * const credentials = {
 *   email: "user@example.com",
 *   password: "securePassword123"
 * };
 * 
 * try {
 *   const response = await loginUser(credentials);
 *   console.log("Access token:", response.data.accessToken);
 * } catch (error) {
 *   console.error("Login failed:", error.message);
 * }
 */
export async function loginUser(user) {
  const url = `https://v2.api.noroff.dev/auth/login`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  const response = await fetch(url, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Login failed");
  }
  return json;
}