import { NextResponse } from "next/server";
import net from "net";

export const revalidate = 10;

interface ServerConfig {
  name: string;
  host: string;
  port: number;
  description: string;
}

const SERVERS: ServerConfig[] = [
  { name: "Hub", host: "127.0.0.1", port: 25566, description: "Lobby principal et spawn" },
  { name: "Faction", host: "127.0.0.1", port: 25567, description: "PVP Faction — raids, bases et conquetes" },
  { name: "PvP Mine", host: "127.0.0.1", port: 25568, description: "Mine PvP — minerais custom et combat" },
];

function pingServer(host: string, port: number, timeout = 3000): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(timeout);
    socket.once("connect", () => {
      socket.destroy();
      resolve(true);
    });
    socket.once("timeout", () => {
      socket.destroy();
      resolve(false);
    });
    socket.once("error", () => {
      socket.destroy();
      resolve(false);
    });
    socket.connect(port, host);
  });
}

export async function GET() {
  try {
    const results = await Promise.all(
      SERVERS.map(async (server) => ({
        name: server.name,
        port: server.port,
        description: server.description,
        online: await pingServer(server.host, server.port),
        players: 0,
      }))
    );

    try {
      const res = await fetch("https://api.mcsrvstat.us/3/play.antallia-pvp-faction.fr", {
        next: { revalidate: 30 },
      });
      const data = await res.json();
      const totalPlayers = data.players?.online ?? 0;

      const onlineServers = results.filter((s) => s.online);
      if (onlineServers.length > 0 && totalPlayers > 0) {
        const perServer = Math.floor(totalPlayers / onlineServers.length);
        const remainder = totalPlayers % onlineServers.length;
        onlineServers.forEach((s, i) => {
          s.players = perServer + (i < remainder ? 1 : 0);
        });
      }
    } catch {}

    return NextResponse.json(results);
  } catch {
    return NextResponse.json(
      SERVERS.map((s) => ({
        name: s.name,
        port: s.port,
        description: s.description,
        online: false,
        players: 0,
      }))
    );
  }
}
