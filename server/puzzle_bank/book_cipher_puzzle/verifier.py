# verifier.py
SECRET = "CLUE"   # <- the hidden answer you set

user_input = input("Enter the decoded word: ").strip().upper()

if user_input == SECRET:
    print("✅ Correct! You found the secret word.")
else:
    print("❌ Wrong, try again!")
