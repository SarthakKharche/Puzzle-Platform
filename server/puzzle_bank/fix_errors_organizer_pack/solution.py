# solution.py (organizer version) - fixed program that decodes secret.bin
def read_data(path):
    with open(path, "rb") as f:
        data = f.read()
    return data

def decode(data):
    key = 0x5A
    out_bytes = bytes([b ^ key for b in data])
    try:
        return out_bytes.decode("utf-8")
    except Exception:
        # fallback: convert to ascii ignoring errors
        return out_bytes.decode("ascii", errors="ignore")

def main():
    raw = read_data("secret.bin")
    message = decode(raw)
    print("Decoded message ->", message)

if __name__ == "__main__":
    main()
