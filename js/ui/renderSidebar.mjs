import { createSidebar } from "./createSidebar.mjs";

export const renderSidebar = () => {
  const headerNav = document.querySelector("#sidebarNav");
  if (!headerNav) {
    console.warn("#sidebarNav not found");
    return;
  }

  headerNav.append(
    createSidebar(
      "./index.html",
      "./singletask.html",
      "./weekly.html",
      "./about.html",
      "./faq.html",
      "./login.html",
      "./register.html",
      "./profile.html",
    ),
  );
};
