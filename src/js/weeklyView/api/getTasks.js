/* import { isLoggedIn } from '../utils/auth/isLoggedIn.js';
import { showStatusMessage } from '../utils/showStatusMessage.js';
export async function fetchTasks(weekNumber) {
  if (!isLoggedIn()) {
    showStatusMessage('User not logged in. Cannot fetch tasks.');
    console.log('⚠️ User not logged in. Cannot fetch tasks. Using dummy data.');
    const listItems = document.querySelectorAll('#taskList li');
    const tasks = Array.from(listItems).map((item) => ({
      title: item.textContent.trim(),
      week: weekNumber,
    }));
    return tasks;
  }
}
 */
