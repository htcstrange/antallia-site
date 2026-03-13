import { readFileSync } from "fs";
import { join } from "path";
import { createHash, randomBytes } from "crypto";
import { cookies } from "next/headers";

interface AdminConfig {
  username: string;
  passwordHash: string;
}

const ADMIN_FILE = join(process.cwd(), "data", "content", "admin.json");
const SESSION_COOKIE = "admin_session";
const sessions = new Map<string, { expires: number }>();

function hashPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex");
}

function getAdminConfig(): AdminConfig {
  const raw = readFileSync(ADMIN_FILE, "utf-8");
  return JSON.parse(raw);
}

export function verifyPassword(password: string): boolean {
  const config = getAdminConfig();
  return hashPassword(password) === config.passwordHash;
}

export function createSession(): string {
  const token = randomBytes(32).toString("hex");
  sessions.set(token, { expires: Date.now() + 24 * 60 * 60 * 1000 });
  return token;
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  const session = sessions.get(token);
  if (!session) return false;
  if (Date.now() > session.expires) {
    sessions.delete(token);
    return false;
  }
  return true;
}

export function destroySession(token: string): void {
  sessions.delete(token);
}
