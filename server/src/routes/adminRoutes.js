import express from "express";
import { getDashboardSnapshot } from "../services/dashboardService.js";
import { adjustTimer, skipCurrentPuzzle } from "../services/puzzleService.js";
import { getDefaultPuzzleBankDir, syncPuzzlesFromFolder } from "../services/puzzleBankService.js";

export function createAdminRouter(store) {
  const router = express.Router();

  router.get("/overview", (_req, res) => {
    return res.json(getDashboardSnapshot(store));
  });

  router.get("/leaderboard", (_req, res) => {
    const snapshot = getDashboardSnapshot(store);
    return res.json({
      updated_at: snapshot.updated_at,
      leaderboard: snapshot.leaderboard
    });
  });

  router.post("/team/:teamId/skip", (req, res) => {
    const { teamId } = req.params;
    const result = skipCurrentPuzzle(store, teamId);
    req.io.emit("dashboard:update", getDashboardSnapshot(store));

    if (!result.ok) {
      return res.status(400).json(result);
    }

    return res.json(result);
  });

  router.post("/team/:teamId/timer", (req, res) => {
    const { teamId } = req.params;
    const { remainingSeconds } = req.body || {};

    if (typeof remainingSeconds !== "number" || remainingSeconds < 0) {
      return res.status(400).json({ message: "remainingSeconds must be a non-negative number." });
    }

    const result = adjustTimer(store, teamId, remainingSeconds);
    req.io.emit("dashboard:update", getDashboardSnapshot(store));

    if (!result.ok) {
      return res.status(400).json(result);
    }

    return res.json(result);
  });

  router.post("/sync-puzzle-bank", (req, res) => {
    const { folderPath, replaceExistingFromSource, replaceAllPuzzles } = req.body || {};

    const result = syncPuzzlesFromFolder(store, `${folderPath || ""}`.trim() || getDefaultPuzzleBankDir(), {
      replaceExistingFromSource: Boolean(replaceExistingFromSource),
      replaceAllPuzzles: Boolean(replaceAllPuzzles)
    });

    if (!result.ok) {
      return res.status(400).json(result);
    }

    req.io.emit("dashboard:update", getDashboardSnapshot(store));
    return res.json(result);
  });

  return router;
}
