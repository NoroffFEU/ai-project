import { isLoggedIn } from "../auth/isLoggedIn.mjs";
import { createTaskBoardItem } from "../ui/createTaskBoardItem.mjs";
import { addToLocalStorage } from "../utils/localStorage.mjs";
import { fetchTasks } from "../api/fetchTasks.mjs";
import { dropdownButtonListener } from "../listeners/dropdownButtonListener.mjs";
import { taskCheckboxListener } from "../listeners/taskCheckboxListener.mjs";

/**
 * Loads and displays tasks on the task board using API (logged in users) or demo data (guests).
 * Updates task counters and handles error states.
 *
 * @returns {Promise<void>}
 */
export async function handleTaskBoardData() {
  const taskBoardContainer = document.querySelector("#task-board-container");

  taskBoardContainer.innerHTML = "";

  if (isLoggedIn()) {
    try {
      const taskData = await fetchTasks();
      if (taskData) {
        taskData.tasks.forEach((task) => {
          taskBoardContainer.appendChild(createTaskBoardItem(task));
        });
      }
    } catch (error) {
      taskBoardContainer.innerText = "No tasks available.";
    }
  } else {
    try {
      const fetchDemoData = await fetch("/src/data/mockData.json");
      if (!fetchDemoData.ok) {
        taskBoardContainer.innerText = "No tasks available.";
        return;
      }
      const demoData = await fetchDemoData.json();
      let tasks;

      if (demoData.tasks.length > 0) {
        const taskLimit = window.innerWidth >= 768 ? 8 : 4;
        const limitedTasks = demoData.tasks.slice(0, taskLimit);

        addToLocalStorage("tasks", JSON.stringify(limitedTasks));
        tasks = limitedTasks;
      } else {
        taskBoardContainer.innerText = "No tasks available.";
        return;
      }

      if (tasks && tasks.length > 0) {
        tasks.forEach((task) => {
          taskBoardContainer.appendChild(createTaskBoardItem(task));
        });

        const completedTasks = tasks.filter((task) => task.completed);
        document.querySelector("#completed-tasks").innerText =
          completedTasks.length;
        document.querySelector("#total-tasks").innerText = tasks.length;
      } else {
        taskBoardContainer.innerText = "No tasks available.";
      }
    } catch (error) {
      taskBoardContainer.innerText = "No tasks available.";
    }
  }
  dropdownButtonListener();
  taskCheckboxListener();
}
