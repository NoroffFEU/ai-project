/**
 * @file favicons.js
 * @description Handels automatic favicon swap based on browers colour scheme prefrences (dark/light)
 *              subisdary, the OS colourscheme.
 * 
 * @example 
 */

/**
 * Update the link rel="icon" to the correct asset for the preset theme.
 * @param {"light"|"dark"} theme - Theme derived from media query (ala system setting). 
 */

function setFavicon(theme) {
    const base =
        theme === "dark"
        ? "/assets/favicon/iconWhite.svg"
        : "/assets/favicon/iconBlack.svg";

    const href = `${base}?v=${Date.now()}`;

    // reuse existin link rel icon if found, otherwise create a new one.
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
    }

    // apply correct favicon based on system prefrence
    link.href = href;
}

/**
 * initializes automatic favicon switching based on ssystem theme. 
 * Listens for real-time changes (e.g. user switches dark/light in the OS).
 */

function initFaviconTheme() {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    const apply = () => setFavicon(mq.matches ? "dark" : "light");

    // Run on initial load
    apply();

    // update when or if the system theme changes
    mq.addEventListener("change", apply);
}

// !! run automatically when script loads !! 
document.addEventListener("DOMContentLoaded", initFaviconTheme);