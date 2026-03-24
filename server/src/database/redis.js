import { config } from "dotenv";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import Redis from "ioredis";

const __dirname = dirname(fileURLToPath(import.meta.url));
const serverRoot = resolve(__dirname, "../..");

// Load runtime env first; fall back to example config for local onboarding.
config({ path: resolve(serverRoot, ".env") });
if (!process.env.REDIS_URL) {
  config({ path: resolve(serverRoot, "example.env") });
}

const redisUrl = process.env.REDIS_URL ?? "redis://localhost:6379";
const globalForRedis = globalThis;

// Keep a singleton in non-production to avoid opening extra sockets on hot reload.
export const redisClient =
  globalForRedis.__redisClient ??
  new Redis(redisUrl, {
    // Fast exponential-ish backoff with a ceiling to prevent reconnect storms.
    retryStrategy: (times) => Math.min(times * 50, 2000),
    // Bound retries for command requests so callers fail fast under outages.
    maxRetriesPerRequest: 3
  });

// Redis pub/sub must use a dedicated connection separate from regular commands.
export const redisSub =
  globalForRedis.__redisSub ??
  new Redis(redisUrl);

if (process.env.NODE_ENV !== "production") {
  globalForRedis.__redisClient = redisClient;
  globalForRedis.__redisSub = redisSub;
}

redisClient.on("connect", () => console.log("[Redis] Connected"));
redisClient.on("error", (err) => console.error("[Redis] Error:", err));

redisSub.on("error", (err) => console.error("[RedisSub] Error:", err));
redisSub.on("end", () => console.warn("[RedisSub] Connection ended"));
// Application shutdown helper: close both command and subscription sockets.
async function safeQuit(client, label) {
  if (!client) return;
  const QUIT_TIMEOUT_MS = 5000;

  try {
    await Promise.race([
      client.quit(),
      new Promise((_, reject) => {
        setTimeout(
          () =>
            reject(
              new Error(
                `[Redis] ${label} quit() timeout after ${QUIT_TIMEOUT_MS}ms`
              )
            ),
          QUIT_TIMEOUTMS
        );
      })
    ]);
  } catch (err) {
    console.error(`[Redis] Error during ${label} quit():`, err);
    client.disconnect();
  }
}

export async function disconnectRedis() {
  await Promise.all([
    safeQuit(redisClient, "client"),
    safeQuit(redisSub, "subscriber")
  ]);
}
