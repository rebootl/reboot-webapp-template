import type { Request, Response } from "express";

const parseField = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

export default (req: Request, res: Response) => {
  if (!req.locals.loggedIn) {
    res.redirect("/cms/login");
    return;
  }

  const rawId = req.params.id;
  const id = Number(rawId);
  if (Number.isNaN(id)) {
    res.status(400).send("Invalid entry id");
    return;
  }

  const title = parseField(req.body.title);
  if (!title) {
    res.status(400).send("Title is required");
    return;
  }

  const type = parseField(req.body.type);
  if (!type) {
    res.status(400).send("Type is required");
    return;
  }

  const content = typeof req.body.content === "string" ? req.body.content : "";
  const isPrivate = String(req.body.private || "0") === "1" ? 1 : 0;

  try {
    const existsStmt = req.db.prepare("SELECT * FROM entries WHERE id = ? LIMIT 1");
    const existing = existsStmt.get(id);
    if (!existing) {
      res.status(404).send("Entry not found");
      return;
    }

    const versionStmt = req.db.prepare(
      "INSERT INTO entries_versions (entry_id, created_at, last_modified_at, title, content) VALUES (?, ?, ?, ?, ?)",
    );
    const versionCreatedAt = new Date().toISOString();
    versionStmt.run(
      id,
      versionCreatedAt,
      existing.modified_at,
      existing.title,
      existing.content,
    );

    const updateStmt = req.db.prepare(
      "UPDATE entries SET title = ?, type = ?, content = ?, private = ?, modified_at = ? WHERE id = ?",
    );
    updateStmt.run(
      title,
      type,
      content,
      isPrivate,
      new Date().toISOString(),
      id,
    );

    res.redirect("/cms/entries");
  } catch (error) {
    console.error("Failed to update entry", error);
    res.status(500).send("Failed to update entry");
  }
};
