import { loginHandler } from "./handlers/loginHandler.mjs";
import { logOut } from "./utils/logOut.mjs";
import { toggleSidebar } from "./utils/toggleSidebar.mjs";
import { renderSidebar } from "./ui/renderSidebar.mjs";
import { sidebar } from "./sidebar.js";

renderSidebar();
toggleSidebar();
logOut("/");
loginHandler();
sidebar();