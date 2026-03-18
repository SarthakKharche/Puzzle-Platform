import sys
from pathlib import Path
import re

# Expected is the organizer's answer in answer.txt (kept beside this script)
def load_expected(base: Path) -> str:
    p = base / "answer.txt"
    if not p.exists():
        print("Missing answer.txt. (Organizer file)")
        sys.exit(2)
    return p.read_text(encoding="utf-8").strip()

def normalize(s: str) -> str:
    # Letters only, uppercase
    s = re.sub(r'[^A-Za-z]', '', s)
    return s.upper()

def main():
    if len(sys.argv) != 2:
        print("Usage: python verifier.py SUBMISSION.txt")
        sys.exit(2)

    base = Path(__file__).parent
    expected = normalize(load_expected(base))
    sub_path = Path(sys.argv[1])
    if not sub_path.exists():
        print(f"Could not read {sub_path}")
        sys.exit(2)
    submitted = normalize(sub_path.read_text(encoding="utf-8"))

    if submitted == expected:
        print("RESULT: ✅ SUCCESS")
        print(f"Word: {submitted}")
        sys.exit(0)
    else:
        print("RESULT: ❌ Incorrect")
        print(f"Your submission: {submitted}")
        sys.exit(1)

if __name__ == "__main__":
    main()
