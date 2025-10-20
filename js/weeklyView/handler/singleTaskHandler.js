// js/weeklyView/handler/singleTaskHandler.js
import { getTaskById } from "../data/tasks.js";
import { getISOWeek } from "../utils/getISOWeek.js";

export function singleTaskHandler() {
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const container = document.getElementById("singleTaskContainer");

  if (!container) return;

  if (!id) {
    container.innerHTML = `<div class="alert alert-warning">Missing task id in URL.</div>`;
    return;
  }

  const task = getTaskById(id);
  if (!task) {
    container.innerHTML = `<div class="alert alert-danger">Task not found.</div>`;
    return;
  }

  const { week, year } = getISOWeek(new Date(task.endDate));
  const backWeek = params.get("week") || week;
  const backYear = params.get("year") || year;

  container.innerHTML = `
    <div class="card border-${mapColor(task.color)}">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-start">
          <h2 class="h4 mb-0">${escapeHtml(task.title)}</h2>
          <span class="badge text-bg-${mapColor(task.color)}">${task.color}</span>
        </div>
        <p class="mt-3">${escapeHtml(task.description || "No description")}</p>

        <dl class="row small">
          <dt class="col-sm-3">Due date</dt>
          <dd class="col-sm-9">${task.endDate}</dd>
          <dt class="col-sm-3">Week</dt>
          <dd class="col-sm-9">${week} / ${year}</dd>
          <dt class="col-sm-3">Created</dt>
          <dd class="col-sm-9">${new Date(task.createdAt).toLocaleString()}</dd>
          <dt class="col-sm-3">Task ID</dt>
          <dd class="col-sm-9"><code>${task.id}</code></dd>
        </dl>

        <div class="mt-4 d-flex gap-2">
          <a class="btn btn-outline-secondary" href="weekly.html?week=${backWeek}&year=${backYear}">
            ← Back to week ${backWeek}
          </a>
          <!-- (valgfritt) legg til edit/delete her senere -->
        </div>
      </div>
    </div>
  `;
}

function mapColor(color) {
  switch (color) {
    case "red":
      return "danger";
    case "green":
      return "success";
    case "blue":
      return "primary";
    case "yellow":
      return "warning";
    case "purple":
      return "secondary";
    default:
      return "secondary";
  }
}

function escapeHtml(str) {
  return String(str).replace(
    /[&<>"']/g,
    (m) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        m
      ],
  );
}
