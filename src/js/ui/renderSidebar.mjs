import { createSidebar } from "./createSidebar.mjs";

export const renderSidebar = () => {
  const headerNav = document.querySelector("#sidebarNav");
  if (!headerNav) {
    console.warn("#sidebarNav not found");
    return;
  }

  headerNav.innerHTML = "";

  const path = window.location.pathname;

  // Check if we're in root level pages (sidebar.html, index.html, faq.html, about.html)
  if (
    path.endsWith("/sidebar.html") ||
    path.endsWith("/index.html") ||
    path === "/" ||
    path.endsWith("/faq.html") ||
    path.endsWith("/about.html")
  ) {
    headerNav.append(
      createSidebar(
        "./index.html",
        "./task-board",
        "./your-week/yourWeek.html",
        "./about.html",
        "./faq.html",
        "./login",
        "./register",
      ),
    );
  }

  // Check if we're in subdirectory pages
  if (
    path.includes("/task-board/") ||
    path.includes("/register/") ||
    path.includes("/login/") ||
    path.includes("/your-week/")
  ) {
    headerNav.append(
      createSidebar(
        "../index.html",
        "../task-board",
        "../your-week/yourWeek.html",
        "../about.html",
        "../faq.html",
        "../login",
        "../register",
      ),
    );
  }
};
