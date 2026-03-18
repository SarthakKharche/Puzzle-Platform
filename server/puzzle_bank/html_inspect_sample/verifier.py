# Verifier for HTML Inspect Elements Puzzle
# Usage: python3 verifier.py

import sys

EXPECTED = "PHOENIX"

def main():
    print("Verifier — HTML Inspect Elements Sample")
    print("Enter your final answer (case-sensitive):")
    user = sys.stdin.readline().strip()

    if user == EXPECTED:
        print("✅ Correct! Nicely done.")
        sys.exit(0)
    else:
        print("❌ Not correct. Try inspecting the HTML more carefully.")
        if user.lower() == EXPECTED.lower():
            print("(Close — check letter casing and exact format.)")
        sys.exit(2)

if __name__ == "__main__":
    main()
