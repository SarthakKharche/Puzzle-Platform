# verifier.py - simple verifier for the morse audio sample
SECRET = "HELP"
ans = input("Enter the decoded word: ").strip().upper()
if ans == SECRET:
    print("✅ Correct!")
else:
    print("❌ Incorrect. Try again.")