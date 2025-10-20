import {
  addToLocalStorage,
  getFromLocalStorage,
} from "/js/utils/localStorage.mjs";

const KEY = "tasks";

function readTasks() {
  try {
    const raw = getFromLocalStorage(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeTasks(list) {
  // NB: addToLocalStorage forventer en STRING
  addToLocalStorage(KEY, JSON.stringify(list));
}

/** Hent alle tasks som array */
export function getAllTasks() {
  return readTasks();
}

/** Lagre én ny task (append) og returnér den */
export function saveTask(task) {
  const list = readTasks();
  list.push(task);
  writeTasks(list);
  return task;
}

/** Slett én task på id (tåler både tall og UUID-string) */
export function deleteTask(taskId) {
  const list = readTasks();
  const next = list.filter((t) => String(t.id) !== String(taskId));
  writeTasks(next);
}

/** Oppdater/erstatte en task (matcher på id) */
export function replaceTask(updated) {
  const list = readTasks();
  const next = list.map((t) =>
    String(t.id) === String(updated.id) ? updated : t,
  );
  writeTasks(next);
  return updated;
}
