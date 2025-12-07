import type { Request } from "express";

import { renderMessage } from "./messages.ts";

const locale = {
  "en": {
    "nav": {
      "dashboard": "Dashboard",
      "entries": "Entries", // not used atm, (needed because times doesn't understand the comments below)
      "settings": "Settings", // not used atm
      "users": "Users", // not used atm
      "logout": "Logout",
    },
    "footer": {
      "text": "Some footer text here.",
    },
  },
  "de": {
    "nav": {
      "dashboard": "Dashboard",
      "entries": "Einträge", // not used atm
      "settings": "Einstellungen", // not used atm
      "users": "Benutzer", // not used atm
      "logout": "Abmelden",
    },
    "footer": {
      "text": "Fusszeile Text.",
    },
  },
};

export default (content: string, req: Request) => {
  const ref = req.path || "";
  const currentLanguage = req.lang || "en";
  const loggedIn = req.locals.loggedIn || false;
  const messageType = req.query.messageType || null;
  const navLabels = locale[currentLanguage].nav;

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CMS - Reboot Framework</title>
    <meta name="description" content="Content Management System for Reboot Framework" />
  </head>
  <body>
    <header>
      <nav aria-label="Global">
        <div>
          <h1>CMS - Reboot Framework</h1>
        </div>
        <div>
          ${
    loggedIn
      ? `
          <span><a href="/cms">${navLabels.dashboard}</a></span>
          <!-- <span><a href="/cms/entries">${navLabels.entries}</a></span> -->
          <!-- <span><a href="/cms/settings">${navLabels.settings}</a></span> -->
          <!-- <span><a href="/cms/users">${navLabels.users}</a></span> -->
          <span><a href="/cms/logout">${navLabels.logout}</a></span>
          `
      : ""
  }
          <span><a href="/set-lang?lang=en&ref=${ref}">EN</a></span>
          <span><a href="/set-lang?lang=de&ref=${ref}">DE</a></span>
        </div>
      </nav>
    </header>
    <main>
      ${
    messageType
      ? `
      <section>
        ${renderMessage(messageType, currentLanguage)}
      </section>`
      : ""
  }
      ${content}
    </main>
    <footer>
      <p>${locale[currentLanguage].footer.text}</p>
    </footer>
  </body>
</html>
`;
};
