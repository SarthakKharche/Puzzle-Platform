Progressive Caesar Cipher — Sample
===================================

Rule:
- Take the plaintext letters A–Z (ignore spaces/punctuation for indexing).
- For the 1st letter shift by ROT1, 2nd letter by ROT2, 3rd by ROT3, and so on.
- Preserve case; non-letters are copied unchanged and DO NOT increase the shift index.

Example plaintext:
    MEET AT NOON

Progressive shifts (letters only):
    M(+1) E(+2) E(+3) T(+4)  A(+5) T(+6)  N(+7) O(+8) O(+9) N(+10)

Ciphertext:
    NGHX FZ UWXX

Files in this folder:
- plaintext.txt        -> the example plaintext
- cipher.txt           -> the resulting progressive-caesar ciphertext
- encrypt.py           -> encodes any input using Progressive Caesar
- decrypt.py           -> decodes Progressive Caesar back to plaintext
- verifier.py          -> asks user for the decoded phrase and verifies
- README.txt           -> this file

How to use (quick):
1) Encode your own text:
       python encrypt.py "HELLO WORLD"
   Output will print on screen.

2) Decode the provided cipher:
       python decrypt.py cipher.txt
   Should output: MEET AT NOON

How to run the verifier:
Open a terminal/command prompt → navigate to the folder using cd <your_folder_path> → run the command:

python verifier.py

Notes:
- Alphabet is A–Z; accents/Unicode are passed through unchanged without shifting.
- Shifts wrap around (e.g., Z + 2 -> B).
