# decode_book_cipher.py
import re

def load_pages(path="book.txt"):
    with open(path, encoding="utf-8") as f:
        text = f.read()
    pages = []
    parts = re.split(r"---\s*PAGE\s*\d+\s*---", text, flags=re.IGNORECASE)
    for p in parts:
        p = p.strip()
        if p:
            pages.append(p)
    return pages

def words_from_page(page_text):
    return re.findall(r"\b[\w']+\b", page_text)

def decode(coords_path="coords.txt", book_path="book.txt"):
    pages = load_pages(book_path)
    letters = []
    with open(coords_path, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            try:
                p_str,w_str,l_str = line.split(":")
                p = int(p_str); w = int(w_str); l = int(l_str)
            except Exception as e:
                print("Invalid coordinate format:", line); raise
            if p < 1 or p > len(pages):
                raise IndexError(f"Page {p} out of range (1..{len(pages)})")
            words = words_from_page(pages[p-1])
            if w < 1 or w > len(words):
                raise IndexError(f"Word {w} out of range on page {p} (1..{len(words)})")
            word = words[w-1]
            if l < 1 or l > len(word):
                raise IndexError(f"Letter {l} out of range in word '{word}' on page {p}")
            letters.append(word[l-1])
    return "".join(letters)

if __name__ == "__main__":
    decoded = decode("coords.txt", "book.txt")
    print("Decoded message:", decoded)
