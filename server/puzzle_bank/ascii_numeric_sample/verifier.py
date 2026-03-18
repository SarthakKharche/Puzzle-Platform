# Verifier for Numeric ASCII Art Puzzle — Sample
# Usage: python3 verifier.py
import sys
EXPECTED = "COSC 7989"

def main():
    print("Verifier — Numeric ASCII Art Sample")
    print("Enter your final answer (case-sensitive):")
    user = sys.stdin.readline().strip()
    if user == EXPECTED:
        print("✅ Correct! Nicely done.")
        sys.exit(0)
    else:
        print("❌ Not correct. Try viewing puzzle.txt in a monospaced font and read the big shapes.")
        if user.lower() == EXPECTED.lower():
            print("(Close — check letter casing and exact format.)")
        sys.exit(2)

if __name__ == '__main__':
    main()
