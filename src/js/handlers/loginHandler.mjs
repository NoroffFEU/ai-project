import { submitForm } from "../utils/submitForm.mjs";

export function loginHandler () { 
    const loginForm = document.getElementById('login-form');

     if (loginForm) {
        loginForm.addEventListener("submit", submitForm);
    }
   
}