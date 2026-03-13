import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const DB_PATH = path.join(process.cwd(), "data", "users.json");
const TOKENS_PATH = path.join(process.cwd(), "data", "tokens.json");

interface User {
  pseudo: string;
  passwordHash: string;
  salt: string;
  grade: string;
  createdAt: string;
  lastLogin: string;
}

interface TokenEntry {
  pseudo: string;
  token: string;
  createdAt: string;
  expiresAt: string;
}

function getUsers(): User[] {
  try {
    if (!fs.existsSync(DB_PATH)) {
      const dir = path.dirname(DB_PATH);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(DB_PATH, "[]");
      return [];
    }
    return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
  } catch {
    return [];
  }
}

function saveUsers(users: User[]) {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
}

function getTokens(): TokenEntry[] {
  try {
    if (!fs.existsSync(TOKENS_PATH)) {
      const dir = path.dirname(TOKENS_PATH);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(TOKENS_PATH, "[]");
      return [];
    }
    return JSON.parse(fs.readFileSync(TOKENS_PATH, "utf-8"));
  } catch {
    return [];
  }
}

function saveTokens(tokens: TokenEntry[]) {
  const dir = path.dirname(TOKENS_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(TOKENS_PATH, JSON.stringify(tokens, null, 2));
}

function generateSalt(): string {
  return crypto.randomBytes(16).toString("hex");
}

function hashPassword(pw: string, salt: string): string {
  return crypto.createHash("sha256").update(salt + pw).digest("hex");
}

function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

function isValidPseudo(pseudo: string): boolean {
  return /^[a-zA-Z0-9_]{3,16}$/.test(pseudo);
}

function cleanExpiredTokens(tokens: TokenEntry[]): TokenEntry[] {
  const now = new Date().toISOString();
  return tokens.filter((t) => t.expiresAt > now);
}

export async function POST(request: NextRequest) {
  try {
    const { pseudo, password, action, token } = await request.json();

    // Token-based session validation
    if (action === "validate" && token) {
      let tokens = cleanExpiredTokens(getTokens());
      const entry = tokens.find((t) => t.token === token);
      if (!entry) {
        return NextResponse.json({ success: false, error: "Session invalide ou expiree" }, { status: 401 });
      }
      const users = getUsers();
      const user = users.find((u) => u.pseudo.toLowerCase() === entry.pseudo.toLowerCase());
      if (!user) {
        return NextResponse.json({ success: false, error: "Utilisateur introuvable" }, { status: 404 });
      }
      saveTokens(tokens);
      return NextResponse.json({ success: true, pseudo: user.pseudo, grade: user.grade });
    }

    if (!pseudo || !password) {
      return NextResponse.json({ success: false, error: "Pseudo et mot de passe requis" }, { status: 400 });
    }

    if (!isValidPseudo(pseudo)) {
      return NextResponse.json(
        { success: false, error: "Pseudo invalide (3-16 caracteres, lettres/chiffres/underscore)" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: "Le mot de passe doit faire au moins 6 caracteres" },
        { status: 400 }
      );
    }

    const users = getUsers();

    if (action === "register") {
      if (users.find((u) => u.pseudo.toLowerCase() === pseudo.toLowerCase())) {
        return NextResponse.json({ success: false, error: "Ce pseudo est deja utilise" }, { status: 400 });
      }

      const salt = generateSalt();
      const newUser: User = {
        pseudo,
        passwordHash: hashPassword(password, salt),
        salt,
        grade: "Joueur",
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };
      users.push(newUser);
      saveUsers(users);

      const sessionToken = generateToken();
      let tokens = cleanExpiredTokens(getTokens());
      tokens.push({
        pseudo: newUser.pseudo,
        token: sessionToken,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      });
      saveTokens(tokens);

      return NextResponse.json({
        success: true,
        pseudo: newUser.pseudo,
        grade: newUser.grade,
        token: sessionToken,
      });
    }

    // Login - support both old (unsalted) and new (salted) password hashes
    let user = users.find((u) => {
      if (u.pseudo.toLowerCase() !== pseudo.toLowerCase()) return false;
      if (u.salt) {
        return u.passwordHash === hashPassword(password, u.salt);
      }
      // Legacy: unsalted SHA256 for old accounts
      const legacyHash = crypto.createHash("sha256").update(password).digest("hex");
      return u.passwordHash === legacyHash;
    });

    if (!user) {
      return NextResponse.json({ success: false, error: "Pseudo ou mot de passe incorrect" }, { status: 401 });
    }

    // Migrate old accounts to salted hash on login
    if (!user.salt) {
      const salt = generateSalt();
      user.salt = salt;
      user.passwordHash = hashPassword(password, salt);
      saveUsers(users);
    }

    user.lastLogin = new Date().toISOString();
    saveUsers(users);

    const sessionToken = generateToken();
    let tokens = cleanExpiredTokens(getTokens());
    // Remove old tokens for this user
    tokens = tokens.filter((t) => t.pseudo.toLowerCase() !== pseudo.toLowerCase());
    tokens.push({
      pseudo: user.pseudo,
      token: sessionToken,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    });
    saveTokens(tokens);

    return NextResponse.json({
      success: true,
      pseudo: user.pseudo,
      grade: user.grade,
      token: sessionToken,
    });
  } catch {
    return NextResponse.json({ success: false, error: "Erreur serveur" }, { status: 500 });
  }
}
