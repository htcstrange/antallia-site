import { NextResponse } from "next/server";
import net from "net";

export const revalidate = 10;

interface ServerInfo {
  name: string;
  host: string;
  port: number;
}

const SERVERS: ServerInfo[] = [
  { name: "Proxy", host: "127.0.0.1", port: 25565 },
  { name: "Hub", host: "127.0.0.1", port: 25566 },
  { name: "Faction", host: "127.0.0.1", port: 25567 },
  { name: "PvP Mine", host: "127.0.0.1", port: 25568 },
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
    // Ping all servers in parallel
    const results = await Promise.all(
      SERVERS.map(async (server) => ({
        name: server.name,
        port: server.port,
        online: await pingServer(server.host, server.port),
      }))
    );

    const proxyOnline = results.find((r) => r.name === "Proxy")?.online ?? false;

    if (proxyOnline) {
      // Try the external API for detailed player count
      try {
        const res = await fetch("https://api.mcsrvstat.us/3/play.antallia-pvp-faction.fr", {
          next: { revalidate: 30 },
        });
        const data = await res.json();

        return NextResponse.json({
          online: true,
          players: data.players?.online ?? 0,
          maxPlayers: data.players?.max ?? 200,
          version: "1.12.2",
          motd: "Antallia Network - PVP Faction",
          servers: results,
        });
      } catch {
        return NextResponse.json({
          online: true,
          players: 0,
          maxPlayers: 200,
          version: "1.12.2",
          motd: "Antallia Network - PVP Faction",
          servers: results,
        });
      }
    }

    // Proxy is offline, try external API as fallback
    try {
      const res = await fetch("https://api.mcsrvstat.us/3/play.antallia-pvp-faction.fr", {
        next: { revalidate: 30 },
      });
      const data = await res.json();
      return NextResponse.json({
        online: data.online ?? false,
        players: data.players?.online ?? 0,
        maxPlayers: data.players?.max ?? 0,
        version: data.version ?? "1.12.2",
        motd: data.motd?.clean?.[0] ?? "",
        servers: results,
      });
    } catch {
      return NextResponse.json({
        online: false,
        players: 0,
        maxPlayers: 0,
        version: "1.12.2",
        motd: "",
        servers: results,
      });
    }
  } catch {
    return NextResponse.json({
      online: false,
      players: 0,
      maxPlayers: 0,
      version: "1.12.2",
      motd: "",
      servers: [],
    });
  }
}
