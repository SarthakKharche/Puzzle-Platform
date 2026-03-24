import { config } from "dotenv";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const { Pool } = pg;

const __dirname = dirname(fileURLToPath(import.meta.url));
const serverRoot = resolve(__dirname, "../..");

// Load real runtime config first; fallback keeps local setup friction low.
config({ path: resolve(serverRoot, ".env") });
if (!process.env.DATABASE_URL) {
  config({ path: resolve(serverRoot, "example.env") });
}

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set. Configure it in server/.env for your cloud PostgreSQL service.");
}

const globalForPool = globalThis;

// Reuse one pool instance in dev/hot-reload to avoid socket leaks.
export const pool =
  globalForPool.__pgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    // Managed Postgres usually requires TLS; allow explicit local opt-out.
    ssl:
      process.env.PG_SSL === "false"
        ? false
        : {
            rejectUnauthorized: process.env.PG_SSL_REJECT_UNAUTHORIZED === "true"
          },
    // Conservative defaults suitable for most API workloads.
    max: Number(process.env.PG_POOL_MAX ?? 20),
    idleTimeoutMillis: Number(process.env.PG_IDLE_TIMEOUT_MS ?? 30000),
    connectionTimeoutMillis: Number(process.env.PG_CONNECT_TIMEOUT_MS ?? 10000)
  });

if (process.env.NODE_ENV !== "production") {
  globalForPool.__pgPool = pool;
}

pool.on("error", (error) => {
  console.error("[PostgreSQL] Unexpected pool error:", error);
});

// Startup probe: validates credentials/network and fails fast on misconfig.
export async function connectDatabase() {
  const client = await pool.connect();
  try {
    await client.query("SELECT 1");
  } finally {
    client.release();
  }
  console.log("[Database] PostgreSQL connected");
  return { pool };
}

export async function query(text, params = []) {
  return pool.query(text, params);
}

// Helper for atomic multi-step operations.
export async function withTransaction(work) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await work(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function disconnectDatabase() {
  // Graceful shutdown: stop accepting new work and drain active clients.
  await pool.end();
}
