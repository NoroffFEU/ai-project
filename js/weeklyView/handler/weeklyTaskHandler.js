// js/weeklyView/handler/weeklyTaskHandler.js
import { createTaskCard } from "../utils/createTaskCard.js";
import { getAllTasks, saveTask } from "../data/tasks.js";
import { renderTaskByWeek } from "../ui/renderTaskByWeek.js";
import { getISOWeek, isoWeeksInYear } from "../utils/getISOWeek.js";
import { initWeekPagination } from "../components/weekPagination.js";
import { isLoggedIn } from "../../auth/isLoggedIn.mjs";

const state = { week: null, year: null };

function bootstrapDummyTasksFromDOMOnce() {
  if (getAllTasks().length > 0) return;

  const ul = document.getElementById("taskList");
  if (!ul) return;

  const items = [...ul.querySelectorAll("li")];
  items.forEach((li) => {
    const title =
      li.querySelector(".task-title")?.textContent?.trim() ||
      li.textContent.trim() ||
      "Untitled";

    const due =
      li.dataset.dueDate ||
      li.dataset.createdAt ||
      new Date().toISOString().slice(0, 10);
    const createdAtIso = li.dataset.createdAt
      ? new Date(li.dataset.createdAt).toISOString()
      : new Date().toISOString();

    const { week, year } = getISOWeek(new Date(due));

    const task = {
      id: crypto.randomUUID(),
      title,
      description: "",
      endDate: due,
      createdAt: createdAtIso,
      color: "purple",
      week,
      year,
    };

    saveTask(task);
  });

  ul.remove();
}

export function weeklyTaskHandler() {
  // Hide login prompt if user is logged in
  const loginPrompt = document.querySelector("#login-prompt");
  if (isLoggedIn() && loginPrompt) {
    loginPrompt.style.setProperty("display", "none", "important");
  }

  const { week, year } = getISOWeek(new Date());
  state.week = week;
  state.year = year;

  bootstrapDummyTasksFromDOMOnce();
  renderTaskByWeek(state.week, state.year, getAllTasks());

  const paginationEl = document.getElementById("weekPagination");
  if (paginationEl) {
    initWeekPagination({
      el: paginationEl,
      initialWeek: state.week,
      totalWeeks: isoWeeksInYear(state.year),
      windowSize: 5,
      onChange: (newWeek) => {
        state.week = newWeek;
        renderTaskByWeek(state.week, state.year, getAllTasks());
      },
    });
  }

  createTaskCard((task) => {
    const { week: w, year: y } = getISOWeek(new Date(task.endDate));
    const enriched = { ...task, week: w, year: y };
    saveTask(enriched);

    renderTaskByWeek(state.week, state.year, getAllTasks());
  });

  const weekSelect = document.querySelector("#weekSelect");
  if (weekSelect) {
    weekSelect.addEventListener("change", (e) => {
      const [w, y] = e.target.value.split("-").map(Number);
      state.week = w;
      state.year = y;
      renderTaskByWeek(state.week, state.year, getAllTasks());
    });
  }
}
