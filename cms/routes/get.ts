import type { Request, Response } from "express";

import baseTemplate from "../templates/adminBase.js";

const _locale = {
  "en": {},
  "de": {},
};

export default (req: Request, res: Response) => {
  // const currentLanguage = req.lang || "en";
  if (!req.locals.loggedIn) {
    res.redirect("/cms/login");
    return;
  }

  const content = `
<div class="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
  <div class="w-full max-w-md">
    Hellooo!!
    Hi
  </div>
</div>
`;

  const html = baseTemplate({ req, content });
  res.send(html);
};
