/**
 * Registers a new user account with the Noroff API.
 * 
 * @async
 * @param {Object} user - The user registration information
 * @param {string} user.name - The user's desired username (alphanumeric and underscore only)
 * @param {string} user.email - The user's email address (must end with @stud.noroff.no or @noroff.no)
 * @param {string} user.password - The user's password (minimum 8 characters)
 * @returns {Promise<Object>} The API response containing the newly created user data
 * @returns {Object} response.data - The created user data object
 * @returns {string} response.data.name - The registered user's name
 * @returns {string} response.data.email - The registered user's email
 * @throws {Error} Throws an error if registration fails (e.g., email already exists, invalid email domain, validation errors)
 */


export async function registerUser(user) {
  const url = `https://v2.api.noroff.dev/auth/register`;
  
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
    throw new Error(json.errors?.[0]?.message || "Registration failed");
  }
  return json;
}