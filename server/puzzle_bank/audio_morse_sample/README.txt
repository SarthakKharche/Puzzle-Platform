
Audio Morse Cipher - Beginner Guide

Files included:
- morse_HELP.wav      : audio file encoding the secret word "HELP" in Morse code.
- morse_table.txt     : quick Morse code table for letters.
- decode_with_audacity.txt : step-by-step instructions to view and decode using Audacity.
- decode_with_python.py : simple Python script to read the WAV and attempt to visualize timing (not automated decoding).
- verifier.py         : simple verifier that asks user to enter the word and tells if correct.

What is Morse code?
- Morse uses dots (.) and dashes (-). Each letter is a sequence of dots & dashes.
- In this sample, timing is:
    dot = 0.12 s
    dash = 0.36 s
    gap between elements (dots/dashes within a letter) = 0.12 s
    gap between letters = 0.36 s
    gap between words = 0.84 s

How to decode (beginner, using only your ears):
1. Play morse_HELP.wav (double-click or use any media player).
2. Listen: short beep = dot (.), long beep = dash (-).
3. Pause between letters is slightly longer; pause between words is longer still.
4. Convert the sequence of dots/dashes into letters using the Morse table (morse_table.txt).
5. The decoded word is the secret. Enter it into verifier.py to check.

How to decode (visual method using Audacity - recommended):
1. Install Audacity (free) from https://www.audacityteam.org/
2. Open morse_HELP.wav in Audacity.
3. Zoom into the waveform: you'll see short and long pulses. Measure durations (select and check selection toolbar) to identify dot vs dash.
4. Translate pulses to dots/dashes and then to letters.

Simple Python helper (not full auto-decoder):
- decode_with_python.py provided to load WAV and print durations of pulses (useful to determine dot/dash thresholds).

Verifier:
How to run the verifier:
Open a terminal/command prompt → navigate to the folder using cd <your_folder_path> → run the command:

python verifier.py

Good luck!
