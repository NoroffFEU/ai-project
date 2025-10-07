
/**
 * Toggles the visibility of the sidebar and manages the body's scroll behavior.
 * 
 * - On smaller screens (width < 992px), the sidebar is initially collapsed.
 * - On larger screens, the sidebar is expanded by default.
 * - Clicking the toggle button toggles the sidebar's collapsed state.
 * - When the sidebar is expanded, the body is set to prevent scrolling.
 * - The sidebar's state is adjusted dynamically on window resize.
 * 
 * @function toggleSidebar
 * @listens document#click - Listens for clicks on the sidebar toggle button.
 * @listens window#resize - Adjusts the sidebar's state based on the window size.
 */
export const toggleSidebar = () => {
  const sidebar = document.querySelector("#sidebarNav");
  const body = document.querySelector("body");

  const setInitialState = () => {
    if (window.innerWidth < 992) {
      sidebar.classList.add("collapsed");
      body.classList.remove("no-scroll");
    } else {
      sidebar.classList.remove("collapsed");
      body.classList.remove("no-scroll");
    }
  };

  setInitialState();

  document.addEventListener("click", (e) => {
    if (e.target.closest("#sidebar-toggle-btn")) {
      sidebar.classList.toggle("collapsed");

      if (!sidebar.classList.contains("collapsed")) {
        body.classList.add("no-scroll");
      } else {
        body.classList.remove("no-scroll");
      }
    }
  });

  window.addEventListener("resize", setInitialState);
};
