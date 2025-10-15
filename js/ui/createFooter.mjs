// create a link element
function createLink(text, href) {
  const link = document.createElement("a");
  link.href = href;
  link.textContent = text;
  return link;
}

// footer column
function createColumn(heading, links) {
  const column = document.createElement("div");
  column.className = "footer__column";

  const headingEl = document.createElement("h3");
  headingEl.className = "footer__heading";
  headingEl.textContent = heading;
  column.appendChild(headingEl);

  const list = document.createElement("ul");
  list.className = "footer__links";

  links.forEach(({ text, href }) => {
    const listItem = document.createElement("li");
    listItem.className = "footer__link";
    listItem.appendChild(createLink(text, href));
    list.appendChild(listItem);
  });

  column.appendChild(list);
  return column;
}

// create logo section in first column
function createLogoSection() {
  const column = document.createElement("div");
  column.className = "footer__column footer__column--logo";

  const logo = document.createElement("img");
  logo.src = "assets/logo/LogoWhite.svg";
  logo.alt = "AIMOT Logo";
  logo.className = "footer__logo";
  column.appendChild(logo);

  const heading = document.createElement("h3");
  heading.className = "footer__heading";
  heading.textContent = "About AIMOT";
  column.appendChild(heading);

  const description = document.createElement("p");
  description.className = "footer__description";
  description.textContent =
    "Your AI-powered daily planning assistant designed to help you stay organized, motivated, and productive.";
  column.appendChild(description);

  return column;
}

// create the quick links column
function createQuickLinksColumn() {
  return createColumn("Quick Links", [
    { text: "Home", href: "/index.html" },
    { text: "About", href: "/about.html" },
    { text: "How to Use", href: "/faq.html" },
  ]);
}

// create features column
function createFeaturesColumn() {
  return createColumn("Features", [
    { text: "Daily Planning", href: "/index.html" },
    { text: "AI Assistant", href: "/index.html" },
    { text: "Task Management", href: "/weekly.html" },
  ]);
}

// create credits column
function createCreditsColumn() {
  const column = document.createElement("div");
  column.className = "footer__column";

  const heading = document.createElement("h3");
  heading.className = "footer__heading";
  heading.textContent = "Project Credits";
  column.appendChild(heading);

  const creditsList = document.createElement("ul");
  creditsList.className = "footer__list footer__list--credits";

  const credits = [
    { label: "Developed by:", value: "Noroff octpt team" },
    { label: "Year:", value: "2025" },
    { label: "Version:", value: "1.0" },
  ];

  credits.forEach(({ label, value }) => {
    const listItem = document.createElement("li");
    listItem.className = "footer__list-item";

    const labelEl = document.createElement("strong");
    labelEl.textContent = label;
    listItem.appendChild(labelEl);

    const valueText = document.createTextNode(` ${value}`);
    listItem.appendChild(valueText);

    creditsList.appendChild(listItem);
  });

  column.appendChild(creditsList);
  return column;
}

// create copyright section
function createCopyright() {
  const copyright = document.createElement("div");
  copyright.className = "footer__copyright";

  const copyrightText = document.createElement("p");
  copyrightText.textContent = `© ${new Date().getFullYear()} AIMOT. All rights reserved.`;
  copyright.appendChild(copyrightText);

  return copyright;
}

// MAIN FUNCTION
// putting together complete footer
export function createFooter() {

  const fragment = document.createDocumentFragment();

  const grid = document.createElement("div");
  grid.className = "footer__grid";

  grid.appendChild(createLogoSection());
  grid.appendChild(createQuickLinksColumn());
  grid.appendChild(createFeaturesColumn());
  grid.appendChild(createCreditsColumn());


  fragment.appendChild(grid);
  fragment.appendChild(createCopyright());

  return fragment;
}
// export function createFooter() {
//   const footer = document.createElement("footer");
//   footer.className = "footer";

//   const grid = document.createElement("div");
//   grid.className = "footer__grid";

//   grid.appendChild(createLogoSection());
//   grid.appendChild(createQuickLinksColumn());
//   grid.appendChild(createFeaturesColumn());
//   grid.appendChild(createCreditsColumn());

//   footer.appendChild(grid);
//   footer.appendChild(createCopyright());

//   return footer;
// }
