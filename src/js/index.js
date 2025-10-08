import { sidebar } from "./sidebar.js";
import { toggleSidebar } from "./handlers/toggleSidebar.mjs";
import { renderSidebar } from "./handlers/renderSidebar.mjs";
import { logOut } from "./handlers/logOut.mjs";
import { handleTaskBoardData } from "./handlers/handleTaskBoardData.mjs";
import { loginHandler } from "./handlers/loginHandler.mjs";

handleTaskBoardData();
loginHandler();
logOut("/");
toggleSidebar();
renderSidebar();
sidebar();
