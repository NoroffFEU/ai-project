import { isLoggedIn } from "/js/auth/isLoggedIn.mjs";

function getModalById(id) {
  const el = document.getElementById(id);
  if (!el) return null;
  const B = window.bootstrap;
  return B ? B.Modal.getOrCreateInstance(el) : null;
}

function showAuthRequired() {
  const m = getModalById("authRequiredModal");
  if (m) m.show();
}

export function createTaskCard(onTaskAdded) {
  if (typeof onTaskAdded !== "function") {
    throw new Error("createTaskCard: onTaskAdded must be a function.");
  }

  const addBtn = document.querySelector("#addTaskButton");
  const form = document.querySelector("#addTaskForm");

  if (addBtn) {
    addBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (!isLoggedIn()) {
        showAuthRequired();
        return;
      }

      const addModal = getModalById("staticBackdrop");
      if (addModal) addModal.show();
    });
  }

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!isLoggedIn()) {
      const addModal = getModalById("staticBackdrop");
      if (addModal) addModal.hide();
      showAuthRequired();
      return;
    }

    const title = form.querySelector("#taskTitle")?.value.trim();
    const description =
      form.querySelector("#taskDescription")?.value.trim() || "";
    const endDate = form.querySelector("#endDate")?.value;
    const color = form.querySelector('input[name="taskColor"]:checked')?.value;

    if (!title || !endDate || !color) {
      alert("Please fill in all required fields.");
      return;
    }

    const task = {
      id: crypto.randomUUID(),
      title,
      description,
      endDate,
      color,
      createdAt: new Date().toISOString(),
    };

    onTaskAdded(task);

    const addModal = getModalById("staticBackdrop");
    if (addModal) addModal.hide();
    form.reset();
  });
}
