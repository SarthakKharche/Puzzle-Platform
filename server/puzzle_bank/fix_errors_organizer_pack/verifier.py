# verifier.py - organizer verifier script
# This script expects a submission string (case-insensitive) and checks it.
# Usage: python verifier.py <YOUR_SUBMISSION>
import sys

EXPECTED = "TREASURE"  # organizer-only; do not provide this file to participants

def check(sub):
    return sub.strip().upper() == EXPECTED

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python verifier.py <YOUR_SUBMISSION>")
        sys.exit(1)
    sub = " ".join(sys.argv[1:])
    ok = check(sub)
    if ok:
        print("✅ Correct submission.")
    else:
        print("❌ Incorrect.")
