// js/weeklyView/ui/renderTaskByWeek.js
export function renderTaskByWeek(week, year, allTasks = []) {
  const container = document.getElementById("cardsContainer");
  if (!container) return;

  container.innerHTML = "";
  const filtered = allTasks.filter((t) => t.week === week && t.year === year);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="text-center text-muted py-4">
        No tasks for week ${week}, ${year}.
      </div>`;
    return;
  }

  filtered.forEach((t) => {
    const url = `singletask.html?id=${encodeURIComponent(t.id)}&week=${week ?? week}&year=${year ?? year}`;
    const card = document.createElement("div");
    card.className = `card mb-3 bg-${mapColor(t.color)}`;
    card.innerHTML = `
    <a href="${url}" class="text-decoration-none">
      <div class="card-body">
        <h5 class="card-title text-white">${t.title}</h5>
        <p class="card-text text-white">${t.description ?? ""}</p>
        <p class="card-text "><small class="text-muted">Due: ${t.endDate}</small></p>
        <p class="card-text "><small class="text-muted">Created At: ${new Date(t.createdAt).toLocaleString()}</small></p>
      </div>
      </a>
    `;
    container.appendChild(card);
  });
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
