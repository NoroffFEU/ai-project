export function addToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

export function getFromLocalStorage(key) {
  return localStorage.getItem(key);
}

export function removeFromLocalStorage() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userName');
}