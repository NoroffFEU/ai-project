/**
 * Footer factory module - Creates footer DOM structure using createElement
 * @module createFooter
 */

/**
 * Company name constant
 * @constant {string}
 */
const COMPANY_NAME = "AIMOT";

/**
 * Path to company logo image
 * @constant {string}
 */
const LOGO_PATH = "assets/logo/LogoWhite.svg";

/**
 * Company description text for footer
 * @constant {string}
 */
const COMPANY_DESCRIPTION = "Your AI-powered daily planning assistant designed to help you stay organized, motivated, and productive.";

/**
 * Project credit text
 * @constant {string}
 */
const PROJECT_CREDIT = "Project by Noroff students";

// Helper: Create a link element
/**
 * Creates an anchor element with text and href
 * @param {string} text - Link text content
 * @param {string} href - Link URL
 * @returns {HTMLAnchorElement} Configured anchor element
 */
function createLink(text, href) {
  const link = document.createElement('a');
  link.href = href;
  link.textContent = text;
  return link;
}

// Helper: Create a footer column
/**
 * Creates a footer column with heading and list of links
 * @param {string} heading - Column heading text
 * @param {Array<{text: string, href: string}>} links - Array of link objects
 * @returns {HTMLDivElement} Footer column element
 */
function createColumn(heading, links) {
  const column = document.createElement('div');
  column.className = 'footer__column';

  const headingEl = document.createElement('h3');
  headingEl.className = 'footer__heading';
  headingEl.textContent = heading;
  column.appendChild(headingEl);

  const list = document.createElement('ul');
  list.className = 'footer__links';

  links.forEach(({ text, href }) => {
    const listItem = document.createElement('li');
    listItem.className = 'footer__link';
    listItem.appendChild(createLink(text, href));
    list.appendChild(listItem);
  });

  column.appendChild(list);
  return column;
}

// Helper: Create logo section (first column)
/**
 * Creates the logo section (first column) with company logo and description
 * @returns {HTMLDivElement} Logo section column element
 */
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

// Helper: Create Quick Links column
/**
 * Creates the Quick Links column with navigation links
 * @returns {HTMLDivElement} Quick Links column element
 */
function createQuickLinksColumn() {
  return createColumn('Quick Links', [
    { text: 'Home', href: '/index.html' },
    { text: 'About', href: '/about.html' },
    { text: 'How to Use', href: '/faq.html' }
  ]);
}

// Helper: Create Features column
/**
 * Creates the Features column with feature links
 * @returns {HTMLDivElement} Features column element
 */
function createFeaturesColumn() {
  return createColumn('Features', [
    { text: 'Daily Planning', href: '/index.html' },
    { text: 'AI Assistant', href: '/index.html' },
    { text: 'Task Management', href: '/weekly.html' }
  ]);
}

// Helper: Create Project Credits column
/**
 * Creates the Project Credits column
 * @returns {HTMLDivElement} Credits column element
 */
function createCreditsColumn() {
  const column = document.createElement('div');
  column.className = 'footer__column';

  const heading = document.createElement('h3');
  heading.className = 'footer__heading';
  heading.textContent = 'Project Credits';
  column.appendChild(heading);

  const creditText = document.createElement("h4"); 
  creditText.className = "footer__subheading"; 
  creditText.textContent = PROJECT_CREDIT;

  column.appendChild(heading);
  column.appendChild(creditText);

  return column;
}

// Helper: Create copyright section
/**
 * Creates the copyright section with current year and company name
 * @returns {HTMLDivElement} Copyright section element
 */
function createCopyright() {
  const copyright = document.createElement('div');
  copyright.className = 'footer__copyright';

  const copyrightText = document.createElement('p');
  copyrightText.textContent = `© ${new Date().getFullYear()} ${COMPANY_NAME}. All rights reserved.`;
  copyright.appendChild(copyrightText);

  return copyright;
}

// Main function: Assembles complete footer
/**
 * Creates complete footer content using createElement (no innerHTML)
 * Returns DocumentFragment to be inserted into existing <footer> element
 * @returns {DocumentFragment} Footer content ready to be inserted into DOM
 */
export function createFooter() {
  const fragment = document.createDocumentFragment();

  const grid = document.createElement('div');
  grid.className = 'footer__grid';

  grid.appendChild(createLogoSection());
  grid.appendChild(createQuickLinksColumn());
  grid.appendChild(createFeaturesColumn());
  grid.appendChild(createCreditsColumn());

  fragment.appendChild(grid);
  fragment.appendChild(createCopyright());

  return fragment;
}
