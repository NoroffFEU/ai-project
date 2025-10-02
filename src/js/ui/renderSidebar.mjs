import { createSidebar } from "./createSidebar.mjs";

export const renderSidebar = () => {
  const headerNav = document.querySelector("#sidebarNav");
  headerNav.append(createSidebar());
};
