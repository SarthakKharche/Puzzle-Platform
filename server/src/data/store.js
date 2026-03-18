import fs from "node:fs";
import path from "node:path";
import bcrypt from "bcryptjs";
import { seedData } from "./seed.js";

const DB_FILE = path.resolve(process.cwd(), "src/data/db.json");

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function ensureLifelines(db) {
  const teamIds = db.teams.filter((t) => !t.is_admin).map((t) => t.team_id);
  for (const teamId of teamIds) {
    const existing = db.lifelines.find((l) => l.team_id === teamId);
    if (!existing) {
      db.lifelines.push({
        team_id: teamId,
        lifeline_remaining: 2,
        lifeline_used: 0,
        active_unlock_until: null
      });
    }
  }
}

function normalizeData(db) {
  db.assignments = db.assignments || [];
  db.submissions = db.submissions || [];
  db.lifelines = db.lifelines || [];
  db.sessions = db.sessions || [];
  db.events = db.events || [];
  ensureLifelines(db);
  return db;
}

function buildInitialData() {
  const initial = clone(seedData);
  initial.teams = initial.teams.map((team) => ({
    team_id: team.team_id,
    team_name: team.team_name,
    password_hash: bcrypt.hashSync(team.password, 10),
    is_admin: team.is_admin
  }));
  ensureLifelines(initial);
  return initial;
}

export class DataStore {
  constructor() {
    this.db = null;
  }

  init() {
    if (!fs.existsSync(DB_FILE)) {
      fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
      this.db = buildInitialData();
      this.persist();
      return;
    }

    const content = fs.readFileSync(DB_FILE, "utf8");
    const parsed = JSON.parse(content);
    this.db = normalizeData(parsed);
    this.persist();
  }

  persist() {
    fs.writeFileSync(DB_FILE, `${JSON.stringify(this.db, null, 2)}\n`, "utf8");
  }

  read() {
    return this.db;
  }

  write(mutator) {
    mutator(this.db);
    this.persist();
    return this.db;
  }
}
