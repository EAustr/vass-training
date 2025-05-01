import mongoose, { Schema, model, Document } from "mongoose";
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import { cookies } from "next/headers";
import { cache } from "react";

import type { User } from "@/types/user.model";

  
export interface SessionDocument extends Document {
    id: string;
    userId: string;
    expiresAt: Date;
  }

const sessionSchema = new Schema({
    id: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    expiresAt: { type: Date, required: true, default: () => new Date(Date.now() + 1000 * 60 * 10) }, // 10 minutes from now
},
    { versionKey: false}
);

const SessionModel = mongoose.models.Session || model<SessionDocument>("Session", sessionSchema);

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session = await SessionModel.findOne({ id: sessionId }).populate("userId").exec();

  if (!session) {
    return { session: null, user: null };
  }

  const user: User = {
    id: session.userId._id.toString(),
    username: session.userId.username,
    password: session.userId.password,
    first_name: session.userId.first_name,
    last_name: session.userId.last_name,
  };

  if (Date.now() >= session.expiresAt.getTime()) {
    await SessionModel.deleteOne({ id: session.id });
    return { session: null, user: null };
  }

  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    await session.save();
  }

  return { session, user };
}

export const getCurrentSession = cache(async (): Promise<SessionValidationResult> => {
  const token = (await cookies()).get("session")?.value ?? null;
  if (!token) {
    return { session: null, user: null };
  }
  return await validateSessionToken(token);
});

export async function invalidateSession(sessionId: string): Promise<void> {
  await SessionModel.deleteOne({ id: sessionId });
}

export async function invalidateUserSessions(userId: string): Promise<void> {
  await SessionModel.deleteMany({ userId });
}

export async function setSessionTokenCookie(token: string, expiresAt: Date): Promise<void> {
  (await cookies()).set("session", token, {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
  });
}

export async function deleteSessionTokenCookie(): Promise<void> {
  (await cookies()).set("session", "", {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
  });
}

export function generateSessionToken(): string {
  const tokenBytes = new Uint8Array(20);
  crypto.getRandomValues(tokenBytes);
  return encodeBase32LowerCaseNoPadding(tokenBytes).toLowerCase();
}

export async function createSession(token: string, userId: string): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session = new SessionModel({
    id: sessionId,
    userId, 
  });
  await session.save();
  return session.toObject();
}

export interface Session {
  id: string;
  expiresAt: Date;
  userId: string;
}

export interface SessionDocument extends Document, Session {}

type SessionValidationResult = { session: Session; user: User } | { session: null; user: null };