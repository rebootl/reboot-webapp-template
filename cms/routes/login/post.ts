import process from "node:process";

import type { Request, Response } from "express";

import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const cookieName: string = process.env.ADMIN_COOKIE_NAME || "admin-session-id";

export default async function f(req: Request, res: Response) {
  const { username, password } = req.body;

  // Validate input
  if (typeof username !== "string" || typeof password !== "string") {
    res.status(400).send(
      "Invalid input: username and password must be strings",
    );
    return;
  }

  if (!username || !password) {
    res.status(401).send("Username and password are required");
    return;
  }

  const stmt = req.db.prepare("SELECT * FROM users WHERE username = ?");
  const user = stmt.get(username);

  if (!user) {
    res.status(401).send("Invalid username or password");
    return;
  }

  try {
    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, user.pwhash);

    if (!isMatch) {
      res.status(401).send("Invalid username or password");
      return;
    }

    // Generate session ID using UUID v4
    const sessionId = uuidv4();
    const now = new Date();

    const sessionStmt = req.db.prepare(
      "INSERT INTO sessions (session_id, user_id, created_at) VALUES (?, ?, ?)",
    );
    sessionStmt.run(
      sessionId,
      user.id,
      now.toISOString(),
    );

    // Set session cookie
    res.cookie(cookieName, sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    // const userResult: UserResult = {
    //   id: user.id,
    //   username: user.username,
    //   admin: Boolean(user.admin),
    // };

    res.redirect("/cms");
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("An error occurred during login");
  }
}
