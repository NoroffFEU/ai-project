/**
 * Removes a value from the browser's local storage.
 *
 * @param {string} key - The key of the item to remove from local storage.
 */
export function removeValueFromLocalStorage(key) {
  localStorage.removeItem(key);
}
