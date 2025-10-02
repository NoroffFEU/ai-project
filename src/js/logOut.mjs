import { navigateTo } from "./navigateTo.mjs";
import { removeValueFromLocalStorage } from "./removeValueFromLocalStorage.mjs";

/**
 * Attaches a click event listener to the document to handle logout functionality.
 * When the element closest to the ID "logout-btn" is clicked, it removes the key "accessToken"
 * from local storage and navigates to the specified pathname.
 *
 * @param {string} pathname - The path to navigate to after logging out.
 */
export const logOut = (pathname) => {
  document.addEventListener("click", (e) => {
    if (e.target.closest("#logout-btn")) {
      removeValueFromLocalStorage("accessToken");
      console.log(e.target);
      navigateTo(pathname);
    } else return;
  });
};
