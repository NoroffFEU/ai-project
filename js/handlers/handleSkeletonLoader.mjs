import {
  showSkeletonLoader,
  hideSkeletonLoader,
} from "../helpers/skeletonLoaderHelper.mjs";

/**
 * Handles skeleton loader display for a given content loading function
 * Shows skeleton loader before content loads, then hides it after loading completes
 *
 * @param {Object} options - Configuration options
 * @param {HTMLElement} options.container - The container element to show skeleton in
 * @param {Function} options.loadFunction - Async function that loads the content
 * @param {string} options.loaderType - Type of loader: 'taskboard' or 'weekly'
 * @param {number} options.itemCount - Number of skeleton items to show
 * @param {number} options.minDisplayTime - Minimum time to display skeleton (prevents flicker)
 * @returns {Promise<void>}
 */
export async function handleSkeletonLoader({
  container,
  loadFunction,
  loaderType = "taskboard",
  itemCount = 5,
  minDisplayTime = 500,
}) {
  if (!container) {
    console.error("Container element not found for skeleton loader");
    return;
  }

  if (typeof loadFunction !== "function") {
    console.error("loadFunction must be a function");
    return;
  }

  // Show skeleton loader
  showSkeletonLoader(container, loaderType, itemCount);

  // Start both minimum display timer and content loading
  const startTime = Date.now();

  try {
    // Load the actual content
    await loadFunction();

    // Calculate remaining time to meet minimum display duration
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, minDisplayTime - elapsedTime);

    // Wait for remaining time if needed (prevents flickering)
    if (remainingTime > 0) {
      await new Promise((resolve) => setTimeout(resolve, remainingTime));
    }
  } catch (error) {
    console.error("Error loading content:", error);
    // Even on error, we still hide the skeleton
  } finally {
    // Always hide skeleton loader
    hideSkeletonLoader(container);
  }
}

/**
 * Convenience handler specifically for task board
 * @param {Function} loadFunction - Function that loads task board data
 * @returns {Promise<void>}
 */
export async function handleTaskBoardSkeleton(loadFunction) {
  const container = document.querySelector("#task-board-container");

  await handleSkeletonLoader({
    container,
    loadFunction,
    loaderType: "taskboard",
    itemCount: 5,
    minDisplayTime: 500,
  });
}

/**
 * Convenience handler specifically for weekly view
 * @param {Function} loadFunction - Function that loads weekly data
 * @returns {Promise<void>}
 */
export async function handleWeeklySkeleton(loadFunction) {
  const container = document.querySelector("#weekly-task-container");

  await handleSkeletonLoader({
    container,
    loadFunction,
    loaderType: "weekly",
    itemCount: 7,
    minDisplayTime: 500,
  });
}
