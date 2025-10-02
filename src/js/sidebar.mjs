/**
 * Toggles the visibility of the sidebar based on screen size and user interaction.
 *
 * This function initializes the sidebar's state based on the current window width.
 * It adds event listeners to handle sidebar toggle button clicks and window resize events.
 *
 * Behavior:
 * - On smaller screens (width < 992px), the sidebar is collapsed by default.
 * - On larger screens (width >= 992px), the sidebar is expanded by default.
 * - Clicking the toggle button toggles the collapsed state of the sidebar.
 * - Resizing the window adjusts the sidebar's state based on the new width.
 *
 * @function toggleSideBar
 */
export const toggleSideBar = () => {
  const sidebar = document.querySelector("#sidebarNav");

  const setInitialState = () => {
    if (window.innerWidth < 992) {
      sidebar.classList.add("collapsed");
    } else {
      sidebar.classList.remove("collapsed");
    }
  };

  setInitialState();

  document.addEventListener("click", (e) => {
    if (e.target.closest("#sidebar-toggle-btn")) {
      sidebar.classList.toggle("collapsed");
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 992) {
      sidebar.classList.remove("collapsed");
    } else {
      sidebar.classList.add("collapsed");
    }
  });
};
