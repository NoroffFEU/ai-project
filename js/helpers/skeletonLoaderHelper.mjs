import {
  createSkeletonLoader,
  createWeeklySkeletonLoader,
} from "../ui/createSkeletonLoader.mjs";

/**
 * Shows the skeleton loader in a specified container
 * @param {HTMLElement} container - The container element to add the loader to
 * @param {string} loaderType - Type of loader: 'taskboard' or 'weekly'
 * @param {number} itemCount - Number of skeleton items to show
 * @returns {boolean} Success status
 */
export function showSkeletonLoader(
  container,
  loaderType = "taskboard",
  itemCount = 5,
) {
  if (!container) {
    console.error("Container element not found");
    return false;
  }

  // Clear existing content
  container.innerHTML = "";

  // Create appropriate loader (returns DocumentFragment)
  const skeletonFragment =
    loaderType === "weekly"
      ? createWeeklySkeletonLoader(itemCount)
      : createSkeletonLoader(itemCount);

  // Append directly to container (no wrapper div)
  container.appendChild(skeletonFragment);

  return true;
}

/**
 * Hides the skeleton loader from a container
 * @param {HTMLElement} container - The container element to remove the loader from
 */
export function hideSkeletonLoader(container) {
  if (!container) {
    console.error("Container element not found");
    return;
  }

  // Remove all skeleton items
  const skeletonItems = container.querySelectorAll(".skeleton-item");
  skeletonItems.forEach((item) => item.remove());
}

/**
 * Shows skeleton loader with a minimum display time
 * Useful to prevent flickering on fast loads
 * @param {HTMLElement} container - The container element
 * @param {Function} loadFunction - Async function that loads the actual content
 * @param {Object} options - Configuration options
 * @returns {Promise<void>}
 */
export async function showSkeletonLoaderWithMinTime(
  container,
  loadFunction,
  options = {},
) {
  const {
    loaderType = "taskboard",
    itemCount = 5,
    minDisplayTime = 500, // minimum 500ms to prevent flicker
  } = options;

  // Show skeleton loader
  showSkeletonLoader(container, loaderType, itemCount);

  // Start both timer and load function
  const [, loadResult] = await Promise.all([
    new Promise((resolve) => setTimeout(resolve, minDisplayTime)),
    loadFunction(),
  ]);

  // Hide skeleton loader
  hideSkeletonLoader(container);

  return loadResult;
}
