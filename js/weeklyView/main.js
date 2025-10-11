import isLoggedIn from "./../utils/auth/isLoggedIn";
import { getISOWeek, isoWeeksInYear } from "./utils/getISOWeek";
import { showStatus } from "./utils/showStatusMessage";
import { initWeekPagination } from "./../components/weekPagination";

if (isLoggedIn()) {
  console.log("User is logged in");
  showStatus("Welcome back!", "success");
} else {
  console.log("User is not logged in");
  showStatus("You are not logged in. Displaying dummy data", "warning");
}

let tasks = [];
const uid = () => Math.random().toString(36).slice(2, 10);
function readTasksFromDOM() {
  const list =
    document.getElementById("taskList") ||
    document.querySelector("ul.list-group");
  if (!list) return [];

  const items = Array.from(list.querySelectorAll("li"));
  return items.map((li) => {
    const raw = li.getAttribute("data-created-at") || new Date().toISOString();
    const d = new Date(raw);
    const dateOnly = new Date(
      Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()),
    )
      .toISOString()
      .slice(0, 10);
    const checkbox = li.querySelector('input[type="checkbox"]');
    const completed = Boolean(checkbox?.checked);
    const titleEl = li.querySelector(".task-title");
    const title = (titleEl ? titleEl.textContent : li.textContent).trim();
    return {
      id: uid(),
      title,
      completed,
      createdAt: dateOnly,
    };
  });
}
function renderTaskListForWeek(week, year) {
  const list = document.getElementById("taskList");
  if (!list) return;
  const filtered = tasks.filter((t) => {
    const d = new Date(t.createdAt);
    const { week: w, year: y } = getISOWeek(d);
    return w === week && y === year;
  });
  if (filtered.length === 0) {
    list.innerHTML = `
      <li class="list-group-item border-0 text-center text-muted">
        No tasks for this week: ${week}, ${year}.

      </li>
    `;

    return;
  }
  list.innerHTML = filtered.map(taskToLI).join("");
}
function taskToLI(task) {
  const checkedAttr = task.completed ? "checked" : "";
  const titleHtml = task.completed
    ? `<s>${escapeHtml(task.title)}</s>`
    : escapeHtml(task.title);

  return `
    <li
      class="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2"
      data-id="${task.id}"
      data-created-at="${task.createdAt}"
    >
      <div class="d-flex align-items-center">
        <input class="form-check-input me-2" type="checkbox" aria-label="..." ${checkedAttr} />
        <span class="task-title">${titleHtml}</span>
      </div>
      <button class="btn btn-link p-0 remove-task" title="Remove item" aria-label="Remove">
        <i class="fas fa-times text-primary"></i>
      </button>
    </li>
  `;
}
function escapeHtml(str) {
  return str.replace(
    /[&<>"']/g,
    (m) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[m],
  );
}
function attachListEvents() {
  const list = document.getElementById("taskList");
  if (!list) return;
  list.addEventListener("change", (e) => {
    if (e.target.matches('input[type="checkbox"]')) {
      const li = e.target.closest("li[data-id]");
      const id = li?.dataset?.id;
      if (!id) return;
      const task = tasks.find((t) => t.id === id);
      if (!task) return;
      task.completed = e.target.checked;
      renderTaskListForWeek(pagination.getWeek(), isoYear);
    }
  });
  list.addEventListener("click", (e) => {
    if (e.target.closest(".remove-task")) {
      const li = e.target.closest("li[data-id]");
      const id = li?.dataset?.id;
      if (!id) return;

      tasks = tasks.filter((t) => t.id !== id);
      renderTaskListForWeek(pagination.getWeek(), isoYear);
    }
  });
}
function attachAddTask() {
  const btn = document.querySelector("#addTaskBtn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const currentWeek = pagination.getWeek();
    const createdAt = new Date().toISOString().slice(0, 10);
    tasks.push({
      id: uid(),
      title: "New task",
      completed: false,
      createdAt,
    });
    renderTaskListForWeek(currentWeek, isoYear);
  });
}
tasks = readTasksFromDOM();
const today = new Date();
const { week: startWeek, year: isoYear } = getISOWeek(today);
const totalWeeks = isoWeeksInYear(isoYear);
attachListEvents();
attachAddTask();
const paginationEl = document.getElementById("weekPagination");
const pagination = initWeekPagination({
  el: paginationEl,
  initialWeek: startWeek,
  totalWeeks,
  windowSize: 5,
  onChange: (week) => {
    renderTaskListForWeek(week, isoYear);
  },
});
