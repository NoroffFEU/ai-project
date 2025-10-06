import { createSidebar } from "./createSidebar.mjs";

export const renderSidebar = () => {
  const headerNav = document.querySelector("#sidebarNav");
  if (!headerNav) {
    console.warn("#sidebarNav not found");
    return;
  }

  headerNav.innerHTML = "";

  if (
    window.location.pathname === "/sidebar.html" ||
    window.location.pathname === "/" ||
    window.location.pathname === "/faq.html" ||
    window.location.pathname === "/about.html"
  ) {
    headerNav.append(
      createSidebar(
        "/",
        "/task-board",
        "/week",
        "/about.html",
        "/faq.html",
        "/login",
        "/register"
      )
    );
  }

  if (
    window.location.pathname === "/task-board/" ||
    window.location.pathname === "/register/" ||
    window.location.pathname === "/login/"
  ) {
    headerNav.append(
      createSidebar(
        "../",
        "../task-board",
        "../week",
        "../about.html",
        "../faq.html",
        "../login",
        "../register"
      )
    );
  }
};
