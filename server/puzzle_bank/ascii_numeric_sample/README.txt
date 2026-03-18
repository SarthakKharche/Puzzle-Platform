Numeric ASCII Art — Sample Puzzle
================================

Files included:
  • puzzle.txt — ASCII art composed of numeric characters; the big shapes spell the secret word.
  • verifier.py — runs locally to check participant answers.
  • organizer_solution.txt — the final answer (for organizers only).
  • README.txt — this file.

Participant instructions:
  1) Open puzzle.txt in any text editor with a monospaced font.
  2) Inspect the large number shapes — they form letters when viewed from a distance.
  3) The secret follows the format: NUMKEY: <WORD>
  4) Once you have the answer, run the verifier and enter it exactly (case-sensitive).

How to run the verifier:
Open a terminal/command prompt → navigate to the folder using cd <your_folder_path> → run the command:
python verifier.py

Organizer notes:
  • You can change the ASCII art to a different target word; update organizer_solution.txt
    and the EXPECTED value inside verifier.py accordingly.
  • For extra challenge, hide the art inside a larger file or obfuscate spacing.
