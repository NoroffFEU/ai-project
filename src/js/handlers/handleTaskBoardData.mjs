import { isAuthenticated } from "/src/js/auth/isAuthenticated.mjs";
import { createTaskBoardItem } from "/src/js/ui/createTaskBoardItem.mjs";
import { addToLocalStorage, getFromLocalStorage } from "../localStorage.js";
import { dropdownButtonListener } from "../listeners/dropdownButtonListener.mjs";
import { fetchTasks } from "../api/fetchTasks.mjs";

export async function handleTaskBoardData() {
  const taskBoardContainer = document.querySelector("#task-board-container");

  if (isAuthenticated()) {
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
      const fetchDemoData = await fetch("/src/js/demoData.json");
      if (!fetchDemoData.ok) {
        taskBoardContainer.innerText = "No tasks available.";
        return;
      }
      const demoData = await fetchDemoData.json();
      if (demoData.tasks.length > 0) {
        const limitedTasks = demoData.tasks.slice(0, 4);

        addToLocalStorage("tasks", JSON.stringify(limitedTasks));

        const storedTasks = getFromLocalStorage("tasks");
        const tasks = JSON.parse(storedTasks);
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
}
