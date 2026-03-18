# encrypt.py — Progressive Caesar encoder
import sys
import string

def prog_shift(s: str) -> str:
    alpha = string.ascii_uppercase
    alpha_l = string.ascii_lowercase
    out = []
    k = 0  # counts letters only
    for ch in s:
        if ch.isalpha():
            k += 1
            rot = k % 26
            if ch.isupper():
                idx = alpha.index(ch)
                out.append(alpha[(idx + rot) % 26])
            else:
                idx = alpha_l.index(ch)
                out.append(alpha_l[(idx + rot) % 26])
        else:
            out.append(ch)
    return ''.join(out)

if __name__ == "__main__":
    if len(sys.argv) >= 2:
        text = ' '.join(sys.argv[1:])
    else:
        text = sys.stdin.read()
    print(prog_shift(text))
