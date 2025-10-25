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
  addToLocalStorage(KEY, JSON.stringify(list));
}

export function getTaskById(id) {
  return readTasks().find((t) => String(t.id) === String(id));
}

export function getAllTasks() {
  return readTasks();
}

export function saveTask(task) {
  const list = readTasks();
  list.push(task);
  writeTasks(list);
  return task;
}

export function deleteTask(taskId) {
  const list = readTasks();
  const next = list.filter((t) => String(t.id) !== String(taskId));
  writeTasks(next);
}

export function replaceTask(updated) {
  const list = readTasks();
  const next = list.map((t) =>
    String(t.id) === String(updated.id) ? updated : t,
  );
  writeTasks(next);
  return updated;
}
