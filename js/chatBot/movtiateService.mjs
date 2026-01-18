// Motivation service that reads local JSON and returns a mock motivational response from mockData.json.
import { getMockMotivation } from "./data/mockData.js";

export async function fetchMotivation(prompt) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Get mock motivation data
  const motivation = getMockMotivation(prompt);
  return motivation;
}

// fetch contents inside form id motivationOutput and return the text value
export function getMotivationOutput() {
  const outputDiv = document.getElementById("motivationOutput");
  return outputDiv ? outputDiv.textContent : "";
}

export function setMotivationOutput(text) {
  const outputDiv = document.getElementById("motivationOutput");
  if (outputDiv) {
    outputDiv.textContent = text;
    outputDiv.style.display = "block";
  }
}

export function setupMotivationButton() {
  const button = document.getElementById("motivationButton");
  if (button) {
    button.addEventListener("click", async () => {
      const prompt = getMotivationOutput();
      const motivation = await fetchMotivation(prompt);
      setMotivationOutput(motivation);
    });
  }
}
