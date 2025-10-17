import { loginUser } from "../api/loginUser.mjs";
import { displayError, displaySuccess } from "../ui/shared/displayMessage.mjs";
import { gatherFormData } from "../utils/gatherFormData.mjs";

/**
 * Initializes the login form handler by attaching a submit event listener.
 * This function should be called when the login page loads to set up form handling.
 * 
 * @returns {void}
 * 
 * @example
 * // Call on page load
 * loginHandler();
 */
export function loginHandler() {
  const loginForm = document.getElementById("login-form");

  if (loginForm) {
    loginForm.addEventListener("submit", submitForm);
  }
}

/**
 * Handles the login form submission process.
 * Authenticates the user, stores credentials based on "Stay signed in" preference,
 * displays feedback messages, and redirects on success.
 * 
 * @async
 * @param {Event} event - The form submit event
 * @returns {Promise<void>}
 * 
 * @description
 * This function:
 * - Prevents default form submission
 * - Gathers form data (email and password)
 * - Disables the login button and shows loading state
 * - Calls the API to authenticate the user
 * - Stores user data in localStorage (if "Stay signed in" is checked) or sessionStorage
 * - Displays success message and redirects to home page after 1.5 seconds
 * - Shows error message if authentication fails
 * - Re-enables the login button in the finally block
 * 
 * @throws {Error} Displays error message to user if login fails
 */
async function submitForm(event) {
  event.preventDefault();
  const data = gatherFormData(event);
  const form = event.target;
  const loginButton = document.getElementById("login-button");
  const alertContainer = document.getElementById("alert-container");
  const staySignedIn = document.getElementById("login-checkbox").checked;
  
  try {
    loginButton.disabled = true;
    loginButton.textContent = "Logging in...";
    const { data: userData } = await loginUser(data);
    form.reset();
    // Choose storage based on "Stay signed in" checkbox
    const storage = staySignedIn ? localStorage : sessionStorage;
    storage.setItem("accessToken", userData.accessToken);
    storage.setItem("userEmail", userData.email);
    storage.setItem("userName", userData.name);

    displaySuccess("Login successful! Redirecting...", alertContainer);

    setTimeout(() => {
      window.location.href = "/index.html";
    }, 1500);
  } catch (error) {
    console.error(error);
    displayError(`Login failed: ${error.message}`, alertContainer);
    form.reset();
    loginButton.textContent = "Login";
  } finally {
    loginButton.disabled = false;
    loginButton.textContent = "Login";
  }
}
