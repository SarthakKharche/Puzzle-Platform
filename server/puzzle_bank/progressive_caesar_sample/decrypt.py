# decrypt.py — Progressive Caesar decoder
import sys
import string

def prog_unshift(s: str) -> str:
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
                out.append(alpha[(idx - rot) % 26])
            else:
                idx = alpha_l.index(ch)
                out.append(alpha_l[(idx - rot) % 26])
        else:
            out.append(ch)
    return ''.join(out)

if __name__ == "__main__":
    # Usage:
    #   python decrypt.py "NGHX FZ UWXX"
    #   python decrypt.py cipher.txt
    if len(sys.argv) >= 2:
        if sys.argv[1].endswith('.txt'):
            with open(sys.argv[1], encoding='utf-8') as f:
                s = f.read().strip('\n')
        else:
            s = ' '.join(sys.argv[1:])
    else:
        s = sys.stdin.read()
    print(prog_unshift(s))
