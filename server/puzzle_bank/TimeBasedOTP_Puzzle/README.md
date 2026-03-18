# Time-Based OTP (Visual) — Sample Puzzle

**Concept:** Read letters from an analog "alphabet clock." Each dial shows two hands:
- **Hour hand** points to the **first letter**.
- **Minute hand** points to the **second letter**.

Concatenate the letters from each dial in order to reveal the final word.

## What Players See
- `puzzle.png` — three dials, each with hour+minute hands pointing to letters.
  - Use the printed A–Z ring (A at 12 o’clock, proceeding clockwise).
  - For each dial, read **Hour** then **Minute** → two letters.
  - Put them together across dials (Dial 1, then 2, then 3).

## Deliverables in this Pack
- `base_dial.png` — the clean alphabet dial (for re-use in future puzzles).
- `puzzle.png` — the actual puzzle image for players.
- `verifier.py` — script to validate the final word.
- `answer.txt` — organizer's solution (keep hidden from players).
- `puzzle_spec.json` — hour/minute letter pairs used to construct this sample.
- `README.md` — these instructions.

## How to run the verifier:
Open a terminal/command prompt → navigate to the folder using cd <your_folder_path> → run the command:
python verifier.py

## How to Verify (for organizers or after teams submit)
```bash
python verifier.py SUBMISSION.txt
```
Where `SUBMISSION.txt` contains a single line with the team's final word (letters only).

If correct, the verifier prints **SUCCESS**.

## Customizing Quickly
- Change the entries in `pairs` inside `puzzle_spec.json` (or in code) to target different letters.
- Re-generate `puzzle.png` by adjusting the letters and re-running the drawing code.
