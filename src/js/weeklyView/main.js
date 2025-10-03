// js/main.js
import { getISOWeek, isoWeeksInYear } from './utils/week.js';
import { initWeekPagination } from './components/weekPagination.js';
import { allTasks } from './cards.js'; // <- testdataen din ligger her

// 1) Finn korrekt startuke og år (ISO)
const today = new Date();
const { week: startWeek, year: isoYear } = getISOWeek(today);

// 2) Finn riktig antall uker for dette ISO-året (52 eller 53)
const totalWeeks = isoWeeksInYear(isoYear);

// 3) Initier komponenten
const paginationEl = document.getElementById('weekPagination');

const pagination = initWeekPagination({
  el: paginationEl,
  initialWeek: startWeek,
  totalWeeks,
  windowSize: 5,
  onChange: (week) => {
    renderCardsForWeek(week, isoYear);
  }
});

function renderCardsForWeek(week, year) {
  const cards = document.getElementById('cards');
  const filtered = allTasks.filter(t => t.week === week);

  // Hvis ingen oppgaver
  if (filtered.length === 0) {
    cards.innerHTML = emptyAlert(week, year);
    return;
  }

  // Render kort
  cards.innerHTML = filtered.map(cardHTML).join('');
}

function cardHTML(task) {
  return `
    <div class="card mb-3 shadow-sm">
      <div class="card-body">
        <h5 class="card-title">${task.title}</h5>
        <p class="card-text">${task.description}</p>
      </div>
    </div>
  `;
}

function emptyAlert(week, year) {
  return `
    <div class="alert alert-warning" role="alert">
      Ingen oppgaver registrert for uke ${week}, ${year}.
    </div>
  `;
}

renderCardsForWeek(startWeek, isoYear);
