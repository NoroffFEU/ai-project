export function initWeekPagination({
  el,
  initialWeek = 1,
  totalWeeks = 52,
  windowSize = 5,
  onChange = () => {}
}) {
  let currentWeek = clampWeek(initialWeek);
  function clampWeek(w) {
    return ((w - 1 + totalWeeks) % totalWeeks) + 1;
  }
  function getWindow(center) {
    const half = Math.floor(windowSize / 2);
    let start = center - half;
    let end = center + half;
    if (start < 1) {
      end += (1 - start);
      start = 1;
    }
    if (end > totalWeeks) {
      const diff = end - totalWeeks;
      start = Math.max(1, start - diff);
      end = totalWeeks;
    }
    return { start, end };
  }
  function render() {
    el.innerHTML = '';
    el.appendChild(makeArrowItem('prev', () => setWeek(currentWeek - 1)));
    const { start, end } = getWindow(currentWeek);
    for (let i = start; i <= end; i++) {
      el.appendChild(makeWeekItem(i, i === currentWeek));
    }
    el.appendChild(makeArrowItem('next', () => setWeek(currentWeek + 1)));
  }
  function makeArrowItem(type, onClick) {
    const li = document.createElement('li');
    li.className = ' page-nav';
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'page-nav';
    btn.setAttribute('aria-label', type === 'prev' ? 'Previous week' : 'Next week');
    btn.textContent = type === 'prev' ? '«' : '»';
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      onClick();
    });
    li.appendChild(btn);
    return li;
  }
  function makeWeekItem(weekNumber, isActive) {
    const li = document.createElement('li');
    li.className = 'page-item';
    li.dataset.week = String(weekNumber);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'page-link';
    btn.textContent = weekNumber;
    if (isActive) li.classList.add('active');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      setWeek(weekNumber);
    });
    li.appendChild(btn);
    return li;
  }
 function setWeek(w) {
    currentWeek = clampWeek(w);
    render();
    onChange(currentWeek);
  }
  render();
  onChange(currentWeek);
return {
    getWeek: () => currentWeek,
    setWeek
  };
}
