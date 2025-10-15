import { handleTaskBoardData } from "./handlers/handleTaskBoardData.mjs";
import { loginHandler } from "./handlers/loginHandler.mjs";
import { toggleSidebar } from "./utils/toggleSidebar.mjs";
import { renderSidebar } from "./ui/renderSidebar.mjs";
import { registerHandler } from "./handlers/registerHandler.mjs";

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  renderSidebar();
  // Initialize toggle after sidebar is rendered
  setTimeout(() => {
    toggleSidebar();
  }, 100);
});

const router = () => {
  const pathname = window.location.pathname;

  switch (pathname) {
    case "/":
    case "/index.html":
      handleTaskBoardData();
      break;

    case "/login.html":
      loginHandler();
      break;

    case "/register.html":
      registerHandler();
      break;

    case "/singletask.html":
      break;

    case "/weekly.html":
      break;

    case "/about.html":
      break;

    case "/faq.html":
      break;

    case "/profile.html":
      break;

    default:
      console.warn(`Route not found: ${pathname}`);
  }
};

router();
