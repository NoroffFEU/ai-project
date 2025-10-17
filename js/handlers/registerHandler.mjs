import { registerUser } from "../api/registerUser.mjs";
import { displayError, displaySuccess } from "../ui/shared/displayMessage.mjs";
import { gatherFormData } from "../utils/gatherFormData.mjs";

export function registerHandler() {
  const formContainer = document.querySelector("#register-form");

  if (formContainer) {
    formContainer.addEventListener("submit", submitForm);
  } 
}

/**
 * Handles the registration form submission process.
 * Creates a new user account, validates input, and provides user feedback.
 * 
 * @async
 * @param {Event} event - The form submit event
 * @returns {Promise<void>}
 * 
 * @description
 * This function:
 * - Prevents default form submission
 * - Gathers form data (name, email, password)
 * - Disables the submit button and shows loading state
 * - Calls the API to register the user
 * - Resets the form on success
 * - Displays success message and redirects to login page after 2 seconds
 * - Shows error message if registration fails
 * - Re-enables and resets the button text in the finally block
 * 
 * @throws {Error} Displays error message to user if registration fails
 */
async function submitForm(event) {
  event.preventDefault();
  const data = gatherFormData(event);
  const form = event.target;
  const button = form.querySelector("button[type='submit']");
  const alertContainer = document.getElementById("alert-container");

  try {
    button.disabled = true;
    button.textContent = "Registering...";
    await registerUser(data);
    form.reset();
    displaySuccess("Registration successful! Redirecting to login...", alertContainer);
    setTimeout(() => {
      window.location.href = "/login.html"; // Redirect to login page after success
    }, 2000); // Redirect after 2 seconds
  } catch (error) {
    console.error(error);
    displayError(`Registration failed: ${error.message}`, alertContainer);
    button.textContent = "Sign up";
    form.reset();
  } finally {
    button.disabled = false;
    button.textContent = "Sign up";
  }
}