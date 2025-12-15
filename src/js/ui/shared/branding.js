/**
 * Uses the active theme. 
 * Defaults to 'light' (black logo) if no user preference is stored.
 * @returns {'light' | 'dark'} The chosen theme. 
 */
export function resolveTheme() {
  const stored = localStorage.getItem('theme');
  return stored === 'dark' ? 'dark' : 'light';
}

/**
 * Returns the correct logo path based on the resolved theme.
 * @param {'light' | 'dark'} [theme=resolveTheme()] - The theme to use.
 * @returns {string} The logo file path. 
 */
export function getLogoSrc(theme = resolveTheme()) {
  return theme === 'dark'
    ? './assets/logo/LogoWhite.svg'
    : './assets/logo/LogoBlack.svg';
}

/**
 * Returns the correct icon path based on the resolved theme.
 * @param {'light' | 'dark'} [theme=resolveTheme()] - The theme to use.
 * @returns {string} The icon file path.
 */
export function getIconSrc(theme = resolveTheme()) {
  return theme === 'dark'
    ? './assets/logo/IconWhite.svg'
    : './assets/logo/IconBlack.svg';
}