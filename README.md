# Puzzle Event Platform

A full-stack React + Node.js platform for timed puzzle events with secure team login, random puzzle assignment, anti-cheat controls, lifelines, and real-time admin monitoring.

## Features

- Team login using Team ID and password
- Admin login and dashboard controls
- Randomized puzzle assignment per team
- Countdown timer with automatic puzzle expiry
- Answer validation and auto-assignment of next puzzle
- Lifeline unlock (temporary browser restriction disable)
- Browser lock behavior (fullscreen enforcement, copy/paste disable, tab switch warnings)
- Real-time admin monitoring with leaderboard, event feed, and team controls
- System folder puzzle bank with README-driven instructions and file-content submissions
- Persistent JSON-backed data store following the required table structure

## Tech Stack

- Frontend: React, Vite, React Router, Socket.IO client
- Backend: Node.js, Express, Socket.IO, JWT auth
- Storage: file-backed JSON database (`server/src/data/db.json`)

## Project Structure

- `client/` React web app
- `server/` API server and event engine
- `server/puzzle_bank/` local puzzle folders used by the platform

## Setup

### 1) Install dependencies

```bash
cd server
npm install
cd ../client
npm install
```

### 2) Run backend

```bash
cd server
npm run dev
```

Backend runs on `http://localhost:4000`.

### 3) Run frontend (new terminal)

```bash
cd client
npm run dev
```

Frontend runs on `http://localhost:5173` and calls backend at `http://localhost:4000/api`.

## Demo Credentials

- Teams
  - `T001` / `alpha123`
  - `T002` / `code123`
  - `T003` / `mystic123`
- Admin
  - `ADMIN` / `admin123`

## API Overview

- `POST /api/auth/login`
- `POST /api/auth/admin-login`
- `GET /api/team/status`
- `POST /api/team/submit`
- `GET /api/team/asset?path=<relative_path>`
- `POST /api/team/lifeline`
- `POST /api/team/violation`
- `GET /api/admin/overview`
- `GET /api/admin/leaderboard`
- `POST /api/admin/team/:teamId/skip`
- `POST /api/admin/team/:teamId/timer`
- `POST /api/admin/sync-puzzle-bank`

### Puzzle Bank Workflow (No ZIP)

Place puzzle folders directly inside `server/puzzle_bank` (or any path you pass in admin sync API). Each puzzle folder should contain:

- `README.md` or `README.txt` with instructions shown to participants
- One solution/reference file (`solution.py`, `solution.txt`, `answer.txt`, `organizer_solution.txt`, etc.)
- Any additional files needed for solving (images, scripts, data files)

Participants write code directly in the in-browser editor and submit from the platform. The system executes the code in an isolated temp workspace and verifies stdout against the expected output from the reference solution.

Notes:

- Output-based verification is enabled automatically for runnable reference files (currently `.py` and `.js`).
- If a reference file is not runnable, the platform falls back to content-based validation.

Request body:

```json
{
  "folderPath": "C:\\Users\\sarth\\Desktop\\Puzzle Platform\\server\\puzzle_bank",
  "replaceExistingFromSource": true,
  "replaceAllPuzzles": true
}
```

## Data Tables (JSON Model)

- Teams: team_id, team_name, password_hash
- Puzzles: puzzle_id, puzzle_text, correct_answer
- Assignments: team_id, puzzle_id, start_time, status
- Submissions: team_id, puzzle_id, answer_submitted, timestamp, result
- Lifeline: team_id, lifeline_remaining, lifeline_used

## Notes

- The server enforces single active login per team.
- Timer state persists server-side and cannot be reset by page refresh.
- Admin receives live dashboard updates through Socket.IO.
