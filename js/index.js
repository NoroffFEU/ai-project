import { handleTaskBoardData } from "./handlers/handleTaskBoardData.mjs";
import {
  handleTaskBoardSkeleton,
  handleWeeklySkeleton,
} from "./handlers/handleSkeletonLoader.mjs";
import { loginHandler } from "./handlers/loginHandler.mjs";
import { toggleSidebar } from "./utils/toggleSidebar.mjs";
import { renderSidebar } from "./ui/renderSidebar.mjs";
import { weeklyTaskHandler } from "./weeklyView/handler/weeklyTaskHandler.js";
import { singleTaskHandler } from "./weeklyView/handler/singleTaskHandler.js";
import { registerHandler } from "./handlers/registerHandler.mjs";
import { renderFooter } from "./ui/renderFooter.mjs";
import { isLoggedIn } from "./auth/isLoggedIn.mjs";
import { navigateTo } from "./helpers/navigateTo.mjs"
// import { initWeeklyView } from "./weeklyView/main.js"; Put this in after isLoggedIn() in weeklyView/main.js
import { weeklyTaskHandler } from "./weeklyView/handler/weeklyTaskHandler.js";
import { singleTaskHandler } from "./weeklyView/handler/singleTaskHandler.js";

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
  const pathname = window.location.pathname;

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
