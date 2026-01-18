import { fetchTasks } from "../api/fetchTasks.mjs";
import { isLoggedIn } from "../auth/isLoggedIn.mjs";
import { dropdownButtonListener } from "../listeners/dropdownButtonListener.mjs";
import { createTaskBoardItem } from "../ui/createTaskBoardItem.mjs";
import { addToLocalStorage } from "../utils/localStorage.mjs";
import { taskCheckboxListener } from "../listeners/taskCheckboxListener.mjs";
import { createGuestBanner } from "../ui/createGuestBanner.mjs";

/**
 * Loads and displays tasks on the task board using API (logged in users) or demo data (guests).
 * Updates task counters and handles error states.
 *
 * @returns {Promise<void>}
 */
export async function handleTaskBoardData() {
  const taskBoardModule = document.querySelector("#task-board-module");
  const taskBoardContainer = document.querySelector("#task-board-container");
  const exportListButton = document.querySelector("#export-list-button");
  const loginPrompt = document.querySelector("#login-prompt");

  taskBoardContainer.innerHTML = "";

  if (isLoggedIn()) {
    // Hide login prompt for logged-in users
    if (loginPrompt) {
      loginPrompt.style.setProperty("display", "none", "important");
    }
    if (exportListButton) {
      exportListButton.setAttribute("disabled", "false");
    }
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
    taskBoardModule.prepend(createGuestBanner());
    if (exportListButton) {
      exportListButton.setAttribute("disabled", "true");
    }

    try {
      const fetchDemoData = await fetch("/data/mockData.json");
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
