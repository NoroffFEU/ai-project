import { navigateTo } from "../helpers/navigateTo.mjs";
import { removeUserCredentials } from "./localStorage.mjs";

/**
 * Attaches a click event listener to the document to handle logout functionality.
 * When the element closest to the ID "logout-btn" is clicked, it removes all user credentials
 * from both local storage and session storage and navigates to the specified pathname.
 *
 * @param {string} pathname - The path to navigate to after logging out.
 */
export const logOut = (pathname) => {
  document.addEventListener("click", (e) => {
    if (e.target.closest("#logout-btn")) {
      removeUserCredentials();
      navigateTo(pathname);
    } else return;
  });
};
