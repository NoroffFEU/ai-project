import { isLoggedIn } from "./../auth/isLoggedIn.mjs";

export function createSidebar(
  homeLink,
  singleTaskLink,
  weekLink,
  aboutLink,
  faqLink,
  loginLink,
  registerLink,
  profileLink,
) {
  // aside
  const aside = document.createElement("aside");
  aside.id = "sideBar";
  aside.setAttribute("aria-label", "Sidebar nav menu");
  aside.className =
    "d-flex flex-column align-items-center vh-100 sidebar secondaryColor-bg";

  // nav
  const nav = document.createElement("nav");
  nav.className = "w-100 d-flex flex-column align-items-center px-3";

  // auth wrapper
  const authWrapper = document.createElement("div");
  authWrapper.id = "authWrapper";
  authWrapper.className = "authWrapper w-100";

  const profile = document.createElement("a");
  profile.id = "profile-link";
  profile.type = "button";
  profile.setAttribute("aria-label", "Go to your profile");

  profile.href = profileLink;
  profile.textContent = "Username";

  const logoutBtn = document.createElement("button");
  logoutBtn.type = "button";
  logoutBtn.id = "logout-btn";
  logoutBtn.className = "btn btn-secondary w-100";
  logoutBtn.setAttribute("aria-label", "Logout from your account");
  logoutBtn.textContent = "Logout";

  const loginBtn = document.createElement("a");
  loginBtn.type = "button";
  loginBtn.id = "login-btn";
  loginBtn.href = loginLink;
  loginBtn.className = "btn btn-primary w-100";
  loginBtn.setAttribute("aria-label", "Log into your account");
  loginBtn.textContent = "Log in";

  const registerBtn = document.createElement("a");
  registerBtn.type = "button";
  registerBtn.href = registerLink;
  registerBtn.id = "register-btn";
  registerBtn.className = "btn btn-secondary w-100";
  registerBtn.setAttribute("aria-label", "Register your account");
  registerBtn.textContent = "Register";

  // link list
  const ul = document.createElement("ul");
  ul.id = "linkList";
  ul.className =
    "linkList nav nav-pills flex-column align-items-center text-center sidebar-nav gap-2 w-100";
  ul.setAttribute("role", "navigation");
  ul.setAttribute("aria-label", "Sidebar navigation links");

  const links = [
    { href: homeLink, text: "Home" },
    { href: singleTaskLink, text: "Task" },
    { href: weekLink, text: "Your Week" },
    { href: aboutLink, text: "About" },
    { href: faqLink, text: "FAQ" },
  ];

  links.forEach((link) => {
    const li = document.createElement("li");
    li.className = "sidebar-item w-100";

    const a = document.createElement("a");
    a.href = link.href;
    a.className = "sidebar-link w-100";
    a.textContent = link.text;
    a.setAttribute("aria-label", link.text);

    li.appendChild(a);
    ul.appendChild(li);
  });

  // Displays logout and username if logged in, displays log in and register btn if not.
  const loggedIn = isLoggedIn();
  if (loggedIn) {
    authWrapper.append(profile, logoutBtn);
  } else {
    ul.append(loginBtn, registerBtn);
  }

  nav.append(authWrapper, ul);

  // toggle wrapper
  const toggleWrap = document.createElement("div");
  toggleWrap.className = "sidebar-toggle";

  const toggleBtn = document.createElement("button");
  toggleBtn.id = "sidebar-toggle-btn";
  toggleBtn.type = "button";
  toggleBtn.setAttribute("aria-label", "Toggle sidebar navigation");

  toggleBtn.innerHTML = `
    <svg aria-label="sidebar-btn" width="28" height="28" viewBox="0 0 28 28" fill="currentColor" class="sidebar-icon" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.3335 3.5H4.66683C3.38 3.5 2.3335 4.5465 2.3335 5.83333V22.1667C2.3335 23.4535 3.38 24.5 4.66683 24.5H23.3335C24.6203 24.5 25.6668 23.4535 25.6668 22.1667V5.83333C25.6668 4.5465 24.6203 3.5 23.3335 3.5ZM4.66683 22.1667V8.16667H11.6668V22.1667H4.66683ZM14.0002 22.1667V8.16667H23.3335V5.83333L23.3358 22.1667H14.0002Z" fill="currentColor"/>
      <path d="M7 11.6665H9.33333V13.9998H7V11.6665ZM7 16.3332H9.33333V18.6665H7V16.3332Z" fill="currentColor"/>
    </svg>
  `;

  toggleWrap.appendChild(toggleBtn);

  aside.append(nav, toggleWrap);

  return aside;
}
