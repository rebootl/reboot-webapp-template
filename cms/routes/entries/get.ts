import type { Request, Response } from "express";

import type { EntryLocale } from "./locale.ts";
import type { EntryType } from "./template.ts";

import baseTemplate from "../../templates/base.ts";
import locale from "./locale.ts";
import template from "./template.ts";

type EntryRow = {
  id: number;
  title: string;
  type: string;
  private: number;
  created_at: string;
  modified_at: string;
  [key: string]: unknown;
};

function fetchEntries(req: Request): EntryRow[] {
  try {
    const stmt = req.db.prepare(
      "SELECT id, title, type, private, created_at, modified_at FROM entries ORDER BY created_at DESC",
    );
    return stmt.all() as EntryRow[];
  } catch (error) {
    console.error("Error fetching CMS entries:", error);
    return [] as EntryRow[];
  }
}

function formatDate(value: string, lang: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat(lang, {
    dateStyle: "medium",
  }).format(date);
}

function buildCard(row: EntryRow, currentLocale: EntryLocale, lang: string): EntryType {
  const visibilityLabel = Number(row.private) === 1
    ? currentLocale.labels.visibility.private
    : currentLocale.labels.visibility.public;
  return {
    id: row.id,
    title: row.title || "Untitled entry",
    type: row.type || "Entry",
    visibilityLabel,
    createdLabel: formatDate(String(row.created_at || ""), lang),
    modifiedLabel: formatDate(String(row.modified_at || ""), lang),
  };
}

export default (req: Request, res: Response) => {
  if (!req.locals.loggedIn) {
    res.redirect("/cms/login");
    return;
  }

  const currentLanguage = req.lang || "en";
  const currentLocale = locale[currentLanguage] || locale.en;
  const entries = fetchEntries(req);
  const cards = entries.map((entry) => buildCard(entry, currentLocale, currentLanguage));

  const content = template(currentLocale, cards);
  const html = baseTemplate(content, req);
  res.send(html);
};
