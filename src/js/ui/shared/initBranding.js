import { getLogoSrc, getIconSrc } from './branding.js';

/**
 * Updates page assets (logo and icons) based on the current theme.
 * Looks for: #app-logo, #app-logo-footer, and #app-icon.
 */
export function initBranding() {
  const logoSrc = getLogoSrc();
  const iconSrc = getIconSrc();

  const logoMain = document.getElementById('app-logo');
  const logoFooter = document.getElementById('app-logo-footer');
  const icon = document.getElementById('app-icon');

  if (logoMain) logoMain.src = logoSrc;
  if (logoFooter) logoFooter.src = logoSrc;
  if (icon) icon.src = iconSrc;
}

document.addEventListener('DOMContentLoaded', initBranding);