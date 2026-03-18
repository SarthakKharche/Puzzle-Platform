Instructions

You are given a file containing coordinates in the format:

page:word:letter


Example: 12:4:1 → means go to page 12, take the 4th word, and extract its 1st letter.

Use the provided Book.txt (or the previous puzzle text if mentioned).

Navigate to the correct page.

Find the correct word.

Pick the correct letter.

Collect all the extracted letters in sequence.

These letters will form a hidden word (the secret key).

Example

If the coordinate is 5:2:3 →

Page 5, Word 2 = “Puzzle”

Letter 3 = “z”

Verification

Once you have assembled the final word, verify it by running:

cd <your_folder_path>
python verifier.py


The program will check your word and confirm if it’s correct. ✅