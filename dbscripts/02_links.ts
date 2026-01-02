import { DatabaseSync } from "node:sqlite";

type LegacyLink = {
  id: number;
  user_id: number;
  created_at: string;
  modified_at: string;
  title: string;
  url: string;
  comment: string;
  category_id: number | null;
};

type LegacyLinkTag = {
  id: number;
  user_id: number;
  name: string;
  color: string;
};

type LegacyLinkCategory = {
  id: number | null;
  name: string | null;
};

type LegacyLinkToTag = {
  id: number;
  link_id: number;
  tag_id: number;
};

// Connect to SQLite databases
const db = new DatabaseSync("db/db.sqlite");
const dbOld = new DatabaseSync("dbscripts/db-export/db.sqlite");

// Initialize link_categories table (kept for compatibility)
db.prepare(`
  CREATE TABLE IF NOT EXISTS "link_categories" (
    "id" INTEGER NOT NULL UNIQUE,
    "name" TEXT NOT NULL UNIQUE,
    PRIMARY KEY("id" AUTOINCREMENT)
  );
`).run();

// Initialize link_tags table
db.prepare(`
  CREATE TABLE IF NOT EXISTS "link_tags" (
    "id" INTEGER NOT NULL UNIQUE,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL UNIQUE,
    "color" TEXT NOT NULL DEFAULT "",
    PRIMARY KEY("id" AUTOINCREMENT)
  );
`).run();

// Initialize links table
db.prepare(`
  CREATE TABLE IF NOT EXISTS "links" (
    "id" INTEGER NOT NULL UNIQUE,
    "user_id" INTEGER NOT NULL,
    "created_at" TEXT NOT NULL,
    "modified_at" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "comment" TEXT NOT NULL DEFAULT "",
    "category_id" INTEGER NOT NULL,
    FOREIGN KEY("user_id") REFERENCES "users"("id"),
    FOREIGN KEY("category_id") REFERENCES "link_categories"("id"),
    PRIMARY KEY("id" AUTOINCREMENT)
  );
`).run();

// Initialize link_to_tag table
db.prepare(`
  CREATE TABLE IF NOT EXISTS "link_to_tag" (
    "id" INTEGER NOT NULL UNIQUE,
    "link_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,
    PRIMARY KEY("id" AUTOINCREMENT),
    FOREIGN KEY("tag_id") REFERENCES "link_tags"("id"),
    FOREIGN KEY("link_id") REFERENCES "links"("id")
  );
`).run();

// Load legacy data
const oldLinks = dbOld.prepare("SELECT * FROM links").all() as LegacyLink[];
const oldLinkTags = dbOld.prepare("SELECT * FROM link_tags")
  .all() as LegacyLinkTag[];
const oldCategories = dbOld
  .prepare("SELECT * FROM link_categories")
  .all() as LegacyLinkCategory[];
const oldLinkToTag = dbOld.prepare("SELECT * FROM link_to_tag")
  .all() as LegacyLinkToTag[];

const categoryFirstUser = new Map<number, number>();
for (const link of oldLinks) {
  if (link.category_id == null) {
    continue;
  }
  if (!categoryFirstUser.has(link.category_id)) {
    categoryFirstUser.set(link.category_id, link.user_id);
  }
}

// Migrate existing link tags
const insertLinkTag = db.prepare(`
  INSERT INTO link_tags (id, user_id, name, color)
  VALUES (@id, @user_id, @name, @color)
`);
for (const tag of oldLinkTags) {
  insertLinkTag.run({
    id: tag.id,
    user_id: tag.user_id,
    name: tag.name,
    color: tag.color,
  });
}

// Keep categories for reference, but convert each to a tag
const insertCategory = db.prepare(`
  INSERT INTO link_categories (id, name)
  VALUES (@id, @name)
`);
const findTagByName = db.prepare("SELECT id FROM link_tags WHERE name = ?");
const insertCategoryAsTag = db.prepare(`
  INSERT INTO link_tags (user_id, name, color)
  VALUES (@user_id, @name, @color)
`);

const categoryTagIds = new Map<number, number>();
const fallbackUserId = 1;
for (const category of oldCategories) {
  if (category.id == null || category.name == null) {
    continue;
  }
  insertCategory.run({
    id: category.id,
    name: category.name,
  });

  const tagName = `category:${category.name}`;
  const existingTag = findTagByName.get(tagName) as { id: number } | undefined;
  if (existingTag) {
    categoryTagIds.set(category.id, existingTag.id);
    continue;
  }

  const categoryUserId = categoryFirstUser.get(category.id) ?? fallbackUserId;
  const result = insertCategoryAsTag.run({
    user_id: categoryUserId,
    name: tagName,
    color: "",
  });
  const tagId = Number(result.lastInsertRowid);
  if (Number.isNaN(tagId)) {
    throw new Error(`Failed to create tag for category ${category.name}`);
  }
  categoryTagIds.set(category.id, tagId);
}

// Migrate links and attach their category as a tag
const insertLink = db.prepare(`
  INSERT INTO links (id, user_id, created_at, modified_at, title, url, comment, category_id)
  VALUES (@id, @user_id, @created_at, @modified_at, @title, @url, @comment, @category_id)
`);
const insertCategoryLinkTag = db.prepare(`
  INSERT INTO link_to_tag (link_id, tag_id)
  VALUES (@link_id, @tag_id)
`);

for (const link of oldLinks) {
  if (link.category_id == null) {
    throw new Error(`Link ${link.id} has no category_id`);
  }

  insertLink.run({
    id: link.id,
    user_id: link.user_id,
    created_at: link.created_at,
    modified_at: link.modified_at,
    title: link.title,
    url: link.url,
    comment: link.comment,
    category_id: link.category_id,
  });

  const categoryTagId = categoryTagIds.get(link.category_id);
  if (categoryTagId) {
    insertCategoryLinkTag.run({
      link_id: link.id,
      tag_id: categoryTagId,
    });
  }
}

// Migrate existing link-to-tag relations
const insertOldLinkToTag = db.prepare(`
  INSERT INTO link_to_tag (id, link_id, tag_id)
  VALUES (@id, @link_id, @tag_id)
`);
for (const relation of oldLinkToTag) {
  insertOldLinkToTag.run({
    id: relation.id,
    link_id: relation.link_id,
    tag_id: relation.tag_id,
  });
}
