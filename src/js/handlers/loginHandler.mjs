import { loginUser } from "../API/login.mjs";

export function loginHandler () { 
    const loginForm = document.getElementById('login-form');
    
    
    if (loginForm) {
        loginForm.addEventListener("submit", submitForm);
    }
    async function submitForm(event) {
        event.preventDefault();

        // Gather form data
        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        console.log(data);
        const loginButton = document.getElementById('login-button');
        try {
            loginButton.disabled = true;
            loginButton.textContent = 'Logging in...';

            const apiResponse = await loginUser(data.email, data.password);
            console.log('Login successful:', apiResponse);

        } catch (error) {
            console.error(error);
        }
    
}


}