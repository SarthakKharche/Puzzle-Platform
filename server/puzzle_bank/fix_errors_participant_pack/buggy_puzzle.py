# buggy_puzzle.py
# Fix-the-Errors puzzle (participant version)
# This program is supposed to read a binary file 'secret.bin', XOR each byte with 0x5A,
# convert to text and print the hidden word.
#
# Your task: Fix the syntax and logic errors so the program runs and prints the decoded word.
# IMPORTANT: The decoded word is NOT shown in this file. Do NOT change the secret.bin file.

# fixed_puzzle.py
# Corrected version of the "Fix the Errors" puzzle
"""""
def read_data(path):
    # Open the file in binary mode
    with open(path, "rb") as f:
        data = f.read()
    return data

def decode(data):
    out = ""
    for b in data:               # iterate directly over bytes
        val = b ^ 0x5A           # XOR each byte with the correct key
        out += chr(val)
    return out

def main():
    raw = read_data("secret.bin")
    message = decode(raw)
    print("Decoded message = " + message)

if __name__ == "__main__":
    main()
    
"""""
#correct code is above one remove the comments to execute and del the buggy code below

def read_data(path):
    # wrong mode and missing colon and error handling
    f = open(path, "rb")
    data = f.read()
    f.close()
    return data

def decode(data):
    out = ""
    for ch in data:
        # ord on bytes and wrong xor (example errors)
        val = ord(ch) ^ 0x5A
        out += chr(val)
    return out

def main():
    raw = read_data("secret.bin")
    message = decode(raw)
    print("Decoded message = " + message)

if __name__ == "__main__":
    main()
