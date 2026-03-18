import sys
import re
from pathlib import Path

EXPECTED_CODE = "CODEFEST25"

def strip_leading_nonletters(s: str) -> str:
    # Remove leading spaces but keep digits/punct since we only use letters to assemble the code
    return s.lstrip()

def first_char_for_code(s: str) -> str:
    s = s.lstrip()
    return s[:1]

def load_lines(path: Path):
    with path.open("r", encoding="utf-8") as f:
        return [line.rstrip("\n") for line in f.readlines()]

def reverse_str(s: str) -> str:
    return s[::-1]

def main():
    if len(sys.argv) != 2:
        print("Usage: python verifier.py answers.txt")
        sys.exit(2)
    answers_path = Path(sys.argv[1])
    puzzle_path = Path(__file__).with_name("puzzle.txt")

    if not answers_path.exists():
        print(f"Could not find answers file: {answers_path}")
        sys.exit(2)
    if not puzzle_path.exists():
        print("Could not find puzzle.txt next to verifier.py")
        sys.exit(2)

    encoded = load_lines(puzzle_path)
    answers = load_lines(answers_path)

    if len(answers) != len(encoded):
        print(f"Incorrect number of lines. Expected {len(encoded)}, got {len(answers)}")
        sys.exit(1)

    # Verify each line reverses back to the provided answer (exact match)
    all_ok = True
    for i, (enc, ans) in enumerate(zip(encoded, answers), start=1):
        expected = reverse_str(enc)
        if ans != expected:
            print(f"Line {i} incorrect.")
            print(f"  Expected: {expected!r}")
            print(f"  Found:    {ans!r}")
            all_ok = False

    if not all_ok:
        print("\nRESULT: ❌ Some lines are incorrect. Fix and try again.")
        sys.exit(1)

    # Build final code from first char of each decoded line
    first_chars = [first_char_for_code(a) for a in answers]
    final_code = "".join(first_chars)

    # Friendly message and guard in case someone solved with different phrases
    if final_code.upper() == EXPECTED_CODE:
        print("RESULT: ✅ SUCCESS")
        print(f"Final Code: {final_code}")
        sys.exit(0)
    else:
        print("RESULT: ✅ All lines correct.")
        print(f"Final Code (from your answers): {final_code}")
        # Still exit success because the main puzzle was solved
        sys.exit(0)

if __name__ == "__main__":
    main()
