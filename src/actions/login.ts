"use server";

import { getUserByUsername } from "@/actions/user.actions";
import { verifyPasswordHash } from "@/lib/server/password";
import { createSession, generateSessionToken, setSessionTokenCookie } from "@/lib/server/sessions";
import { redirect } from "next/navigation";

export async function loginAction(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  // Get username and password from form data
  const username = formData.get("username");
  const password = formData.get("password");

  if (typeof username !== "string" || typeof password !== "string") {
    return {
      message: "Invalid or missing fields",
    };
  }

  if (username === "" || password === "") {
    return {
      message: "Please enter your username and password.",
    };
  }

  // Fetch user by username
  const user = await getUserByUsername(username);
  if (!user) {
    return {
      message: "Invalid username or password",
    };
  }

  // Verify password
  const validPassword = await verifyPasswordHash(user.password, password);
  if (!validPassword) {
    return {
      message: "Invalid username or password",
    };
  }

  // Create session and set session cookie
  const sessionToken = generateSessionToken();
  const session = await createSession(sessionToken, user.id);
  setSessionTokenCookie(sessionToken, session.expiresAt);

  // Redirect to dashboard or home page
  console.log("Login successful, redirecting to tasks...");
  return redirect("/tasks");
}

interface ActionResult {
  message: string;
}