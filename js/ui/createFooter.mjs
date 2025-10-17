const COMPANY_NAME = "AIMOT";
const LOGO_PATH = "assets/logo/LogoWhite.svg";
const COMPANY_DESCRIPTION = "Your AI-powered daily planning assistant designed to help you stay organized, motivated, and productive.";
const PROJECT_CREDIT = "Project by Noroff students";


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
  const column = document.createElement('div');
  column.className = 'footer__column footer__column--logo';

  const logo = document.createElement('img');
  logo.src = LOGO_PATH;
  logo.alt = `${COMPANY_NAME} Logo`;
  logo.className = 'footer__logo';
  column.appendChild(logo);

  const heading = document.createElement('h3');
  heading.className = 'footer__heading';
  heading.textContent = `About ${COMPANY_NAME}`;
  column.appendChild(heading);

  const description = document.createElement('p');
  description.className = 'footer__description';
  description.textContent = COMPANY_DESCRIPTION;
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
  const column = document.createElement('div');
  column.className = 'footer__column';

  const heading = document.createElement('h3');
  heading.className = 'footer__heading';
  heading.textContent = 'Project Credits';
  column.appendChild(heading);

  const creditsList = document.createElement('ul');
  creditsList.className = 'footer__links';

  const listItem = document.createElement('li');
  listItem.className = 'footer__link';
  listItem.textContent = PROJECT_CREDIT;
  creditsList.appendChild(listItem);

  column.appendChild(creditsList);
  return column;
}

// create copyright section
function createCopyright() {
  const copyright = document.createElement('div');
  copyright.className = 'footer__copyright';

  const copyrightText = document.createElement('p');
  copyrightText.textContent = `© ${new Date().getFullYear()} ${COMPANY_NAME}. All rights reserved.`;
  copyright.appendChild(copyrightText);

  return copyright;
}

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
