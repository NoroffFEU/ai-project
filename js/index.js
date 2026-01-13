import { handleTaskBoardData } from "./handlers/handleTaskBoardData.mjs";
import { handleTaskBoardSkeleton } from "./handlers/handleSkeletonLoader.mjs";
import { loginHandler } from "./handlers/loginHandler.mjs";
import { toggleSidebar } from "./utils/toggleSidebar.mjs";
import { renderSidebar } from "./ui/renderSidebar.mjs";
import { weeklyTaskHandler } from "./weeklyView/handler/weeklyTaskHandler.js";
import { singleTaskHandler } from "./weeklyView/handler/singleTaskHandler.js";
import { registerHandler } from "./handlers/registerHandler.mjs";
import { renderFooter } from "./ui/renderFooter.mjs";
import { setFavicon } from "./utils/favicons.js";

import { isLoggedIn } from "./auth/isLoggedIn.mjs";
import { navigateTo } from "./helpers/navigateTo.mjs";
// import { initWeeklyView } from "./weeklyView/main.js"; Put this in after isLoggedIn() in weeklyView/main.js

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  renderSidebar();
  renderFooter();
  // Initialize toggle after sidebar is rendered
  setTimeout(() => {
    toggleSidebar();
  }, 100);

  // Call router after DOM is ready
  router();
});

const router = async () => {
  let pathname = window.location.pathname;

  const basePath = "/ai-project"; // Or dynamically get it if it can change
  if (pathname.startsWith(basePath)) {
    pathname = pathname.substring(basePath.length);
    if (pathname === "") {
      // If it was just "/ai-project", treat it as "/"
      pathname = "/";
    }
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setFavicon(prefersDark ? "dark" : "light");

  switch (pathname) {
    case "/":
    case "/index.html":
      handleTaskBoardSkeleton(handleTaskBoardData);
      break;

    case "/login.html":
      loginHandler();
      break;

    case "/singletask.html":
      singleTaskHandler();
      break;

    case "/weekly.html":
      weeklyTaskHandler();
      break;
    case "/register.html":
      registerHandler();
      break;

    case "/about.html":
      break;

    case "/faq.html":
      break;

    case "/profile.html":
      if (!isLoggedIn()) {
        navigateTo("/login.html");
        return;
      }
      break;

    default:
      console.warn(`Route not found: ${pathname}`);
  }
};
