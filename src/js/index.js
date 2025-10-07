import { handleTaskBoardData } from "./handlers/handleTaskBoardData.mjs";
import { loginHandler } from "./handlers/loginHandler.mjs";
import { toggleSidebar } from "./utils/toggleSidebar.mjs";
import { renderSidebar } from "./ui/renderSidebar.mjs";

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  handleTaskBoardData();
  loginHandler();
  renderSidebar();

  // Initialize toggle after sidebar is rendered
  setTimeout(() => {
    toggleSidebar();
  }, 100);
});
