/**
 * Display a success message
 * @param {string} message - The message to show
 * @param {HTMLElement|string} container - Container element or ID (defaults to body)
 */
export function displaySuccess(message, container = document.body) {
  const alert = document.createElement('div');
  alert.className = 'alert alert-success alert-dismissible fade show';
  alert.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  
  const targetContainer = typeof container === 'string' ? document.getElementById(container) : container;
  targetContainer.appendChild(alert);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (alert.parentNode) {
      alert.remove();
    }
  }, 5000);
}

/**
 * Display an error message
 * @param {string} message - The message to show
 * @param {HTMLElement|string} container - Container element or ID (defaults to body)
 */
export function displayError(message, container = document.body) {
  const alert = document.createElement('div');
  alert.className = 'alert alert-danger alert-dismissible fade show';
  alert.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  
  const targetContainer = typeof container === 'string' ? document.getElementById(container) : container;
  targetContainer.appendChild(alert);
  
const btnClose = alert.querySelector('.btn-close');
  if (btnClose) {
    btnClose.addEventListener('click', () => {
      alert.remove();
    });
  }


  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (alert.parentNode) {
      alert.remove();
    }
  }, 5000);
}
