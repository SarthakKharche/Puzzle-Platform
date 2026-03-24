import { redisSub } from "./redis.js";

export function initSocketBridge(io) {
  // Subscribe with patterns so any event/team scoped channel is picked up.
  redisSub.psubscribe("event:*", "team:*", (err) => {
    if (err) {
      console.error("[SocketBridge] Subscribe error:", err);
      return;
    }
    console.log("[SocketBridge] Listening on all event/team channels");
  });

  redisSub.on("pmessage", (_pattern, channel, message) => {
    let payload;
    try {
      payload = JSON.parse(message);
    } catch (error) {
      console.error("[SocketBridge] Invalid JSON message", { channel, error });
      return;
    }

    // event:{eventId}:leaderboard -> broadcast to event room.
    if (channel.match(/^event:.+:leaderboard$/)) {
      const eventId = channel.split(":")[1];
      io.to(`event:${eventId}`).emit("leaderboard:update", payload.data);
      return;
    }

    // event:{eventId}:admin -> broadcast to admin room only.
    if (channel.match(/^event:.+:admin$/)) {
      const eventId = channel.split(":")[1];
      io.to(`admin:${eventId}`).emit("admin:event", payload);
      return;
    }

    // event:{eventId}:timer -> broadcast timer ticks to the event room.
    if (channel.match(/^event:.+:timer$/)) {
      const eventId = channel.split(":")[1];
      io.to(`event:${eventId}`).emit("timer:tick", payload.data ?? payload);
      return;
    }

    // team:{teamId}:puzzle -> push to that team's room only.
    if (channel.match(/^team:.+:puzzle$/)) {
      const teamId = channel.split(":")[1];
      io.to(`team:${teamId}`).emit("puzzle:assigned", payload.data);
      return;
    }

    // team:{teamId}:lifeline -> push to that team's room only.
    if (channel.match(/^team:.+:lifeline$/)) {
      const teamId = channel.split(":")[1];
      io.to(`team:${teamId}`).emit("lifeline:update", payload.data);
    }
  });
}
