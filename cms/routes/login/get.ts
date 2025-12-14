import type { Request, Response } from "express";

import { html } from "../../../lib/helper.ts";

import baseTemplate from "../../templates/base.ts";

const locale = {
  "en": {
    "login": {
      "title": "Login",
      "subtitle": "Sign in to access the admin panel",
      "usernameLabel": "Username",
      "usernamePlaceholder": "Enter your username",
      "passwordLabel": "Password",
      "passwordPlaceholder": "Enter your password",
      "buttonText": "Sign in",
    },
  },
  "de": {
    "login": {
      "title": "Login",
      "subtitle": "Melden Sie sich an, um auf das Admin-Panel zuzugreifen",
      "usernameLabel": "Benutzername",
      "usernamePlaceholder": "Geben Sie Ihren Benutzernamen ein",
      "passwordLabel": "Passwort",
      "passwordPlaceholder": "Geben Sie Ihr Passwort ein",
      "buttonText": "Anmelden",
    },
  },
};

export default (req: Request, res: Response) => {
  const currentLanguage = req.lang || "en";
  const content = html`
    <section class="space-y-8 py-10">
      <header class="text-center space-y-2">
        <h1 class="text-4xl font-bold text-white">${locale[currentLanguage]
          .login.title}</h1>
        <p class="text-dark-muted text-sm">${locale[currentLanguage].login
          .subtitle}</p>
      </header>

      <form
        class="max-w-md mx-auto space-y-5 bg-dark-surface/50 border border-dark-border rounded-2xl p-8 shadow-xl backdrop-blur"
        action="/cms/login"
        method="POST"
      >
        <div class="space-y-2">
          <label for="username" class="text-sm font-medium text-dark-muted">
            ${locale[currentLanguage].login.usernameLabel}
          </label>
          <input
            type="text"
            id="username"
            name="username"
            required
            placeholder="${locale[currentLanguage].login.usernamePlaceholder}"
            class="w-full rounded-xl border border-dark-border bg-dark-bg/70 px-4 py-3 text-white placeholder:text-dark-muted focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300/60"
          />
        </div>

        <div class="space-y-2">
          <label for="password" class="text-sm font-medium text-dark-muted">
            ${locale[currentLanguage].login.passwordLabel}
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="${locale[currentLanguage].login.passwordPlaceholder}"
            class="w-full rounded-xl border border-dark-border bg-dark-bg/70 px-4 py-3 text-white placeholder:text-dark-muted focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300/60"
          />
        </div>

        <div class="flex justify-center">
          <button
            type="submit"
            class="w-full rounded-xl bg-green-300 px-5 py-3 font-medium text-black uppercase hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300/60"
          >
            ${locale[currentLanguage].login.buttonText}
          </button>
        </div>
      </form>
    </section>
  `;
  const r = baseTemplate(content, req);
  res.send(r);
};
