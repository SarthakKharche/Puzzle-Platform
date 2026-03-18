HTML Inspect Elements — Sample Puzzle
=====================================

Files:
  • puzzle.html — the web page containing hidden clues.
  • verifier.py — a script to verify a participant's answer.
  • organizer_solution.txt — the solution (for organizers only).

Participant Instructions (sample):
  1) Open puzzle.html in a web browser.
  2) The visible page looks ordinary, but the real clues are hidden.
  3) Right-click -> "Inspect" or "View Page Source".
  4) Hidden comments, invisible elements, and CSS may contain secrets.
  5) Find the final key and verify with verifier.py.

Expected format:
  HIDDENKEY: PHOENIX

How to run the verifier:
Open a terminal/command prompt → navigate to the folder using cd <your_folder_path> → run the command:

python verifier.py

Organizer Notes:
  • The hidden solution string is embedded in HTML comments and hidden <div>.
  • You may replace "PHOENIX" with another phrase of your choice.
  • Update verifier.py accordingly if you change the expected key.
