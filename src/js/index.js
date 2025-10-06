import { handleTaskBoardData } from "./handlers/handleTaskBoardData.mjs";
import { loginHandler } from "./handlers/loginHandler.mjs";
import { logOut } from "./utils/logOut.mjs";
import { toggleSidebar } from "./utils/toggleSidebar.mjs";
import { renderSidebar } from "./ui/renderSidebar.mjs";

handleTaskBoardData();
loginHandler();
logOut("/");
toggleSidebar();
renderSidebar();
