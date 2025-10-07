import { sidebar } from "./sidebar.js";
import { handleTaskBoardData } from "./handlers/handleTaskBoardData.mjs";
import { loginHandler } from "./handlers/loginHandler.mjs";
import { handleTaskBoardData } from "./handlers/handleTaskBoardData.mjs";

handleTaskBoardData();
loginHandler();
logOut("/");
toggleSidebar();
renderSidebar();

