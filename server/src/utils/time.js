export function nowIso() {
  return new Date().toISOString();
}

export function toMs(seconds) {
  return seconds * 1000;
}

export function getRemainingSeconds(startTimeIso, allowedSeconds) {
  const elapsedMs = Date.now() - new Date(startTimeIso).getTime();
  const remaining = Math.ceil((toMs(allowedSeconds) - elapsedMs) / 1000);
  return Math.max(remaining, 0);
}
