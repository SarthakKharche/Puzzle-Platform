CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  lifeline_count INT NOT NULL DEFAULT 3,
  lifeline_duration_s INT NOT NULL DEFAULT 60,
  puzzle_time_limit_s INT NOT NULL DEFAULT 300,
  max_violations INT NOT NULL DEFAULT 5,
  settings JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE RESTRICT,
  name TEXT NOT NULL,
  access_code TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  score INT NOT NULL DEFAULT 0,
  rank INT NOT NULL DEFAULT 0,
  violation_count INT NOT NULL DEFAULT 0,
  is_locked BOOLEAN NOT NULL DEFAULT FALSE,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'member'
);

CREATE TABLE IF NOT EXISTS puzzles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE RESTRICT,
  external_code TEXT UNIQUE,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty INT NOT NULL DEFAULT 1,
  question TEXT NOT NULL,
  answer_hash TEXT NOT NULL,
  hint TEXT,
  points INT NOT NULL DEFAULT 100,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  submission_mode TEXT NOT NULL DEFAULT 'text',
  validation_mode TEXT NOT NULL DEFAULT 'content',
  expected_file_name TEXT,
  expected_output TEXT,
  source_folder TEXT,
  source_root TEXT,
  asset_files JSONB
);

CREATE TABLE IF NOT EXISTS assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE RESTRICT,
  puzzle_id UUID NOT NULL REFERENCES puzzles(id) ON DELETE RESTRICT,
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE RESTRICT,
  status TEXT NOT NULL DEFAULT 'active',
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  completed_at TIMESTAMPTZ,
  skipped_at TIMESTAMPTZ,
  time_limit_s INT NOT NULL DEFAULT 300
);

CREATE TABLE IF NOT EXISTS submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE RESTRICT,
  puzzle_id UUID NOT NULL REFERENCES puzzles(id) ON DELETE RESTRICT,
  assignment_id UUID NOT NULL REFERENCES assignments(id) ON DELETE RESTRICT,
  answer_raw TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  attempt_number INT NOT NULL,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS lifelines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL UNIQUE REFERENCES teams(id) ON DELETE RESTRICT,
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE RESTRICT,
  uses_remaining INT NOT NULL,
  unlocked_at TIMESTAMPTZ,
  lock_at TIMESTAMPTZ,
  is_active BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS violations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE RESTRICT,
  type TEXT NOT NULL,
  detail TEXT,
  penalty_applied INT NOT NULL DEFAULT 0,
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE RESTRICT,
  token_hash TEXT NOT NULL UNIQUE,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  is_revoked BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_teams_event_id ON teams(event_id);
CREATE INDEX IF NOT EXISTS idx_teams_score ON teams(score);
CREATE INDEX IF NOT EXISTS idx_teams_access_code ON teams(access_code);
CREATE INDEX IF NOT EXISTS idx_team_members_team_id ON team_members(team_id);
CREATE INDEX IF NOT EXISTS idx_puzzles_event_id ON puzzles(event_id);
CREATE INDEX IF NOT EXISTS idx_puzzles_category ON puzzles(category);
CREATE INDEX IF NOT EXISTS idx_puzzles_is_active ON puzzles(is_active);
CREATE INDEX IF NOT EXISTS idx_assignments_team_status ON assignments(team_id, status);
CREATE INDEX IF NOT EXISTS idx_assignments_expires_at ON assignments(expires_at);
CREATE INDEX IF NOT EXISTS idx_assignments_event_status ON assignments(event_id, status);
CREATE INDEX IF NOT EXISTS idx_submissions_team_puzzle ON submissions(team_id, puzzle_id);
CREATE INDEX IF NOT EXISTS idx_submissions_assignment ON submissions(assignment_id);
CREATE INDEX IF NOT EXISTS idx_submissions_submitted_at ON submissions(submitted_at);
CREATE INDEX IF NOT EXISTS idx_lifelines_is_active ON lifelines(is_active);
CREATE INDEX IF NOT EXISTS idx_violations_team_occurred ON violations(team_id, occurred_at);
CREATE INDEX IF NOT EXISTS idx_violations_type ON violations(type);
CREATE INDEX IF NOT EXISTS idx_sessions_token_hash ON sessions(token_hash);
CREATE INDEX IF NOT EXISTS idx_sessions_team_revoked ON sessions(team_id, is_revoked);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);
