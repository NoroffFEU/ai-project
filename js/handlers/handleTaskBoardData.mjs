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
  const staticTaskList = document.querySelector("#static-task-list");

  taskBoardContainer.innerHTML = "";

  // TODO: TEMPORARY - Remove this when API is connected
  // Currently showing static task list for all users (logged in and guests)
  // When API is ready, uncomment the API fetch code below and remove the static list display for logged-in users

  if (isLoggedIn()) {
    // Hide login prompt for logged-in users
    if (loginPrompt) {
      loginPrompt.style.setProperty("display", "none", "important");
    }

    // TODO: Show static list temporarily until API is connected
    // Remove these lines when API is ready:
    if (staticTaskList) {
      staticTaskList.style.setProperty("display", "block", "important");
    }
    if (taskBoardContainer) {
      taskBoardContainer.style.setProperty("display", "none", "important");
    }

    if (exportListButton) {
      exportListButton.setAttribute("disabled", "false");
    }

    /* TODO: Uncomment when API is connected
    try {
      const taskData = await fetchTasks();
      if (taskData) {
        // Show dynamic container and hide static list
        if (staticTaskList) {
          staticTaskList.style.setProperty("display", "none", "important");
        }
        if (taskBoardContainer) {
          taskBoardContainer.style.setProperty("display", "block", "important");
        }
        
        taskData.tasks.forEach((task) => {
          taskBoardContainer.appendChild(createTaskBoardItem(task));
        });
      }
    } catch (error) {
      taskBoardContainer.innerText = "No tasks available.";
    }
    */
  } else {
    // Show static task list for non-logged-in users
    if (staticTaskList) {
      staticTaskList.style.setProperty("display", "block", "important");
    }
    // Hide the dynamic task board container for guests
    if (taskBoardContainer) {
      taskBoardContainer.style.setProperty("display", "none", "important");
    }

    taskBoardModule.prepend(createGuestBanner());
    if (exportListButton) {
      exportListButton.setAttribute("disabled", "true");
    }
  }
  dropdownButtonListener();
  taskCheckboxListener();
}
