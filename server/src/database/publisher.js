import { redisClient } from "./redis.js";

export async function publishLeaderboard(eventId, leaderboardData) {
  await redisClient.publish(
    `event:${eventId}:leaderboard`,
    JSON.stringify({ type: "leaderboard_update", data: leaderboardData })
  );
}

export async function publishPuzzleAssignment(teamId, assignment) {
  await redisClient.publish(
    `team:${teamId}:puzzle`,
    JSON.stringify({ type: "puzzle_assigned", data: assignment })
  );
}

export async function publishLifelineUpdate(teamId, lifelineState) {
  await redisClient.publish(
    `team:${teamId}:lifeline`,
    JSON.stringify({ type: "lifeline_update", data: lifelineState })
  );
}

export async function publishAdminEvent(eventId, payload) {
  await redisClient.publish(
    `event:${eventId}:admin`,
    JSON.stringify(payload)
  );
}
