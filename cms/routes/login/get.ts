import type { Request, Response } from "express";

import baseTemplate from "../../templates/adminBase.js";

const locale = {
  "en": {
    "login": {
      "title": "Admin Login",
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
      "title": "Admin-Login",
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
  const content = `
<div>
  <h2>${locale[currentLanguage].login.title}</h2>
  <p>${locale[currentLanguage].login.subtitle}</p>
  <form action="/cms/login" method="POST">
    <div>
      <label for="username">${
    locale[currentLanguage].login.usernameLabel
  }</label>
      <input
        type="text"
        id="username"
        name="username"
        required
        placeholder="${locale[currentLanguage].login.usernamePlaceholder}"
      />
    </div>
    <div>
      <label for="password">${
    locale[currentLanguage].login.passwordLabel
  }</label>
      <input
        type="password"
        id="password"
        name="password"
        required
        placeholder="${locale[currentLanguage].login.passwordPlaceholder}"
      />
    </div>
    <div>
      <button type="submit">${locale[currentLanguage].login.buttonText}</button>
    </div>
  </form>
</div>
`;
  const html = baseTemplate({ req, content });
  res.send(html);
};
