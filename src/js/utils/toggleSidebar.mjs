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

  if (!sidebar) {
    console.warn("Sidebar element #sidebarNav not found");
    return;
  }

  const setInitialState = () => {
    if (window.innerWidth < 1200) {
      sidebar.classList.add("collapsed");
      body.classList.remove("no-scroll");
      body.classList.remove("sidebar-open");
    } else {
      sidebar.classList.remove("collapsed");
      body.classList.remove("no-scroll");
      body.classList.add("sidebar-open");
    }
  };

  setInitialState();

  // Wait for button to be in DOM
  const attachToggleListener = () => {
    const toggleBtn = document.querySelector("#sidebar-toggle-btn");

    if (!toggleBtn) {
      console.warn("Toggle button #sidebar-toggle-btn not found");
      return;
    }

    console.log("Toggle button found, attaching listener");

    toggleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Toggle button clicked");
      sidebar.classList.toggle("collapsed");

      if (!sidebar.classList.contains("collapsed")) {
        // Sidebar is open
        if (window.innerWidth < 1200) {
          body.classList.add("no-scroll");
        } else {
          body.classList.add("sidebar-open");
        }
      } else {
        // Sidebar is collapsed
        body.classList.remove("no-scroll");
        body.classList.remove("sidebar-open");
      }
    });
  };

  // Try to attach listener immediately
  attachToggleListener();

  window.addEventListener("resize", setInitialState);
};
