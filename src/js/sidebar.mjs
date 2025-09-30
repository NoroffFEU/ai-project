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

document.addEventListener("DOMContentLoaded", toggleSideBar);
