/**
 * Theme toggle functionality for light/dark mode
 */

const THEME_KEY = 'theme-preference';
const THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
};

/**
 * Get the saved theme preference from localStorage or default to light
 * @returns {string} The theme preference
 */
export function getThemePreference() {
  return localStorage.getItem(THEME_KEY) || THEMES.LIGHT;
}

/**
 * Save the theme preference to localStorage
 * @param {string} theme - The theme to save
 */
export function saveThemePreference(theme) {
  localStorage.setItem(THEME_KEY, theme);
}

/**
 * Apply the theme to the document
 * @param {string} theme - The theme to apply
 */
export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

/**
 * Toggle between light and dark themes
 * @returns {string} The new theme
 */
export function toggleTheme() {
  const currentTheme = getThemePreference();
  const newTheme = currentTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
  
  saveThemePreference(newTheme);
  applyTheme(newTheme);
  
  return newTheme;
}

/**
 * Initialize theme on page load
 */
export function initializeTheme() {
  const savedTheme = getThemePreference();
  applyTheme(savedTheme);
}

/**
 * Create the theme toggle button element
 * @returns {HTMLElement} The theme toggle button
 */
export function createThemeToggle() {
  const toggleContainer = document.createElement('div');
  toggleContainer.className = 'theme-toggle-container';
  
  const toggleLabel = document.createElement('label');
  toggleLabel.className = 'theme-toggle-label';
  toggleLabel.setAttribute('aria-label', 'Toggle between light and dark theme');
  
  const toggleInput = document.createElement('input');
  toggleInput.type = 'checkbox';
  toggleInput.className = 'theme-toggle-input';
  toggleInput.id = 'theme-toggle';
  
  // Set initial state based on current theme
  const currentTheme = getThemePreference();
  toggleInput.checked = currentTheme === THEMES.DARK;
  
  const toggleSlider = document.createElement('span');
  toggleSlider.className = 'theme-toggle-slider';
  
  const lightLabel = document.createElement('span');
  lightLabel.className = 'theme-label theme-label--light';
  lightLabel.textContent = 'Light';
  
  const darkLabel = document.createElement('span');
  darkLabel.className = 'theme-label theme-label--dark';
  darkLabel.textContent = 'Dark';
  
  toggleSlider.appendChild(lightLabel);
  toggleSlider.appendChild(darkLabel);
  
  toggleLabel.appendChild(toggleInput);
  toggleLabel.appendChild(toggleSlider);
  toggleContainer.appendChild(toggleLabel);
  
  return toggleContainer;
}

/**
 * Add event listeners for theme toggle
 */
export function setupThemeToggleListeners() {
  const toggleInput = document.getElementById('theme-toggle');
  
  if (toggleInput) {
    // Mouse click event
    toggleInput.addEventListener('change', () => {
      toggleTheme();
    });
    
    // Keyboard support
    toggleInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleInput.checked = !toggleInput.checked;
        toggleTheme();
      }
    });
  }
}