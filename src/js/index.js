import { sidebar } from "./sidebar.js";
import { loginHandler } from "./handlers/loginHandler.mjs";
import { handleTaskBoardData } from "./handlers/handleTaskBoardData.mjs";

handleTaskBoardData();
loginHandler();
sidebar();
