import { mockLoginUser } from "./mockLogin.mjs";

// Set to true to use mock data instead of real API
const MOCK_MODE = true;

/**
 * Attempts to log in a user with the provided email and password.
 * On success, stores the access token and user details in local storage.
 * @param {string} email The user's email address.
 * @param {string} password The user's password.
 * @returns {Promise<{accessToken: string, user: Object}>} An object containing the access token and user details.
 * @throws {Error} Throws an error if login is unsuccessful.
 */
export async function loginUser(email, password) {
  if (MOCK_MODE) {
    return mockLoginUser(email, password);
  }

  const response = await fetch(`https://v2.api.noroff.dev/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const json = await response.json();
    const { accessToken, ...user } = json.data;
    localStorage.setItem("token", JSON.stringify(accessToken));
    localStorage.setItem("user", JSON.stringify(user));
    return { accessToken, user }; // Return the login data
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || response.statusText);
  }
}
