import type { Request } from "express";

import { html } from "../../lib/helper.ts";

import { renderMessage } from "./messages.ts";

const locale = {
  "en": {
    "nav": {
      "dashboard": "Dashboard",
      "entries": "Entries",
      "settings": "Settings",
      "users": "Users",
      "logout": "Logout",
    },
    "footer": {
      "text": "Content management for reboot.li.",
    },
  },
  "de": {
    "nav": {
      "dashboard": "Dashboard",
      "entries": "Einträge",
      "settings": "Einstellungen",
      "users": "Benutzer",
      "logout": "Abmelden",
    },
    "footer": {
      "text": "Content management for reboot.li.",
    },
  },
};

export default (content: string, req: Request) => {
  const ref = req.path || "";
  const currentLanguage = req.lang || "en";
  const loggedIn = req.locals.loggedIn || false;
  let messageKey = req.query.message || null;
  const navLabels = locale[currentLanguage].nav;

  messageKey = typeof messageKey === "string" ? messageKey : null;

  return html`
    <!DOCTYPE html>
    <html lang="en" class="dark">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>reboot.li - CMS</title>
        <meta
          name="description"
          content="Content Management System for Reboot Framework"
        />
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              colors: {
                dark: {
                  bg: "#0f1419",
                  surface: "#1a1f2e",
                  border: "#2d3748",
                  text: "#fff",
                  muted: "#a1a1aa",
                },
              },
            },
          },
        };
        </script>
      </head>
      <body class="bg-dark-bg text-dark-text min-h-screen flex flex-col">
        <header
          class="border-b border-dark-border bg-dark-bg/50 backdrop-blur-sm sticky top-0 z-40"
        >
          <div
            class="mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-3"
          >
            <div>
              <p class="text-dark-muted">reboot.li - CMS</p>
            </div>
            <div class="flex flex-wrap items-center gap-3 text-sm text-dark-muted">
              ${loggedIn
                ? `
            <a href="/cms" class="hover:text-emerald-300 transition">${navLabels.dashboard}</a>
            <a href="/cms/entries" class="hover:text-emerald-300 transition">${navLabels.entries}</a>
            <a href="/cms/logout" class="hover:text-emerald-300 transition">${navLabels.logout}</a>
            <span class="text-dark-border px-2">|</span>
          `
                : ""}
              <a
                href="/set-lang?lang=en&ref=${ref}"
                class="hover:text-emerald-300 transition"
              >EN</a>
              <a
                href="/set-lang?lang=de&ref=${ref}"
                class="hover:text-emerald-300 transition"
              >DE</a>
            </div>
          </div>
        </header>

        <main class="flex-1 w-full bg-dark-bg/40">
          <div class="px-6 py-6">
            ${messageKey
              ? `
          <div class="max-w-4xl mx-auto space-y-8">
            <section class="rounded-2xl border border-emerald-500/40 bg-emerald-500/5 p-6">
              ${renderMessage(messageKey, currentLanguage)}
            </section>
          </div>
        `
              : ""} ${content}
          </div>
        </main>

        <footer class="border-t border-dark-border bg-dark-bg/60">
          <div
            class="max-w-5xl mx-auto px-6 py-6 text-center text-dark-muted text-sm"
          >
            <p>${locale[currentLanguage].footer.text}</p>
          </div>
        </footer>
      </body>
    </html>
  `;
};
