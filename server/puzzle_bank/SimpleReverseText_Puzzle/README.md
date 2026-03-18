# Simple Reverse Text — College Puzzle (Sample)

Welcome to **Simple Reverse Text**! Each line in `puzzle.txt` is an English phrase written **backwards** (character-by-character).

## Your Task
1. Decode each line back into readable English.
2. Put your decoded answers (one per line, in the **same order**) into a file named `answers.txt`.
3. Run the verifier to check your work and reveal the final code.

## How to run the verifier:
Open a terminal/command prompt → navigate to the folder using cd <your_folder_path> → run the command:
python verifier.py

- If everything is correct, you'll see **SUCCESS** and the **Final Code**.
- If something is off, the verifier will show which line failed.

## Hints
- Don't overthink it — it's a plain character reversal.
- Preserve punctuation and spacing exactly as in the decoded phrase.
- The **first character** of each decoded line (ignoring leading spaces) spells a final 10-character code when concatenated: you should get something like a tech-fest themed code.

## Files
- `puzzle.txt` — the encoded phrases you must decode.
- `verifier.py` — checks your answers and prints the final code.
- `answer_template.txt` — a blank template with the correct number of lines.
- `organizer_solution.txt` — the official decoded lines (keep hidden from participants!).

Good luck and have fun!
