export const toggleSideBar = () => {
  const sidebar = document.querySelector("#sidebarNav");

  document.addEventListener("click", (e) => {
    if (e.target.closest("#sidebar-toggle-btn")) {
      sidebar.classList.toggle("collapsed");
    }
  });
};

toggleSideBar();
