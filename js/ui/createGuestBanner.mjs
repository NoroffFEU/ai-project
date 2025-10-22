export function createGuestBanner() {
  const bannerContainer = document.createElement("div");
  bannerContainer.classList.add("bg-info", "p-3", "mb-3", "rounded");

  const guestMessage = document.createElement("p");
  guestMessage.classList.add("mb-0");
  guestMessage.innerText =
    "Welcome, Guest! You are currently viewing the app in demo mode. Please log in to access all features.";
  bannerContainer.appendChild(guestMessage);

  return bannerContainer;
}
