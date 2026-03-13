import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const DATA_DIR = join(process.cwd(), "data", "content");

export function readJSON<T>(filename: string): T {
  const filepath = join(DATA_DIR, filename);
  if (!existsSync(filepath)) return [] as unknown as T;
  const raw = readFileSync(filepath, "utf-8");
  return JSON.parse(raw) as T;
}

export function writeJSON<T>(filename: string, data: T): void {
  const filepath = join(DATA_DIR, filename);
  writeFileSync(filepath, JSON.stringify(data, null, 2), "utf-8");
}
