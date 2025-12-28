import type { Request, Response } from "express";

import { baseTemplate } from "../templates/base.ts";

export type MainContentEntry = {
  title?: string;
  content?: string;
  [key: string]: unknown;
};

const defaultContent = `
  <section class="section">
    <div class="container">
      <h1 class="title">Welcome to Reboot Framework!</h1>
      <p class="subtitle">
        This is the default homepage. You can customize it by editing the template files.
      </p>
    </div>
  </section>
`;

function getMainContentEntry(req: Request) {
  // const lang = req.lang || "en";
  try {
    const stmt = req.db.prepare(
      "SELECT * FROM entries WHERE type = ? AND private = 0 ORDER BY created_at DESC LIMIT 1",
    );
    return stmt.get("maincontent") as MainContentEntry | null;
  } catch (error) {
    console.error("Error fetching main content entry:", error);
    return null;
  }
}

export default (req: Request, res: Response) => {
  const entry = getMainContentEntry(req);
  const content = entry?.content?.trim() ? entry.content : defaultContent;

  const html = baseTemplate(content);
  res.send(html);
};
