import { gatherFormData } from "./gatherFormData.mjs";
import { loginUser } from "../API/login.mjs";
import { displayError } from "../ui/shared/displayMessage.mjs";
import { displaySuccess } from "../ui/shared/displayMessage.mjs";

export async function submitForm(event) {
        event.preventDefault();
        const data = gatherFormData(event);
        const loginButton = document.getElementById('login-button');
        const alertContainer = document.getElementById('alert-container');
        try {
            loginButton.disabled = true;
            loginButton.textContent = 'Logging in...';
            await loginUser(data.email, data.password);
            displaySuccess('Login successful! Redirecting...', alertContainer);
            setTimeout(() => {
                // redirect to dashboard or another page
            }, 1500);

        } catch (error) {
            console.error(error);
            displayError(`Login failed: ${error.message}`, alertContainer);
        }
        finally {
            loginButton.disabled = false;
            loginButton.textContent = 'Login';
        }
}
