# verifier.py — simple input check for the sample puzzle
SECRET = "MEET AT NOON"
attempt = input("Enter the decoded phrase for the sample cipher: ").strip().upper()
if attempt == SECRET:
    print("✅ Correct!")
else:
    print("❌ Incorrect. Try again.")
