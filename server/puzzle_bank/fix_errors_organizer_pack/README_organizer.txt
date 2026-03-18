Fix-the-Errors Puzzle (Organizer)
==================================

Files included:
- solution.py       : fixed script that decodes secret.bin (for organizer reference)
- verifier.py       : check participants' submissions from command line
- secret.bin        : the encoded secret (same as participants)

Usage (organizer):
1) To see the decoded secret (for validation), run:
   python solution.py
   -> This prints the decoded word.

2) To verify a participant submission:
   python verifier.py TREASURE
   -> Prints Correct/Incorrect

Note: Keep solution.py and verifier.py secure; do not share with participants.
