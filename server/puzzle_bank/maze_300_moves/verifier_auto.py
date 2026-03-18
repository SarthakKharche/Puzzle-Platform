# verifier_auto.py - self-check
correct_moves = ['R', 'R', 'R', 'R', 'R', 'R', 'D', 'D', 'D', 'D', 'L', 'L', 'L', 'L', 'L', 'L', 'D', 'D', 'R', 'R', 'D', 'D', 'L', 'L', 'D', 'D', 'D', 'D', 'R', 'R', 'R', 'R', 'D', 'D', 'L', 'L', 'L', 'L', 'D', 'D', 'D', 'D', 'D', 'D', 'R', 'R', 'D', 'D', 'R', 'R', 'R', 'R', 'U', 'U', 'L', 'L', 'U', 'U', 'R', 'R', 'U', 'U', 'U', 'U', 'R', 'R', 'R', 'R', 'D', 'D', 'L', 'L', 'D', 'D', 'D', 'D', 'R', 'R', 'U', 'U', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'D', 'D', 'L', 'L', 'L', 'L', 'D', 'D', 'D', 'D', 'D', 'D', 'R', 'R', 'U', 'U', 'U', 'U', 'R', 'R', 'R', 'R', 'D', 'D', 'L', 'L', 'D', 'D', 'R', 'R', 'D', 'D', 'L', 'L', 'L', 'L', 'D', 'D', 'R', 'R', 'D', 'D', 'L', 'L', 'L', 'L', 'U', 'U', 'L', 'L', 'U', 'U', 'U', 'U', 'L', 'L', 'L', 'L', 'D', 'D', 'D', 'D', 'D', 'D', 'R', 'R', 'D', 'D', 'L', 'L', 'D', 'D', 'L', 'L', 'D', 'D', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'U', 'U', 'R', 'R', 'D', 'D', 'R', 'R', 'R', 'R', 'R', 'R', 'U', 'U', 'R', 'R', 'R', 'R', 'U', 'U', 'U', 'U', 'L', 'L', 'D', 'D', 'L', 'L', 'L', 'L', 'D', 'D', 'L', 'L', 'U', 'U', 'U', 'U', 'U', 'U', 'R', 'R', 'U', 'U', 'R', 'R', 'U', 'U', 'R', 'R', 'D', 'D', 'D', 'D', 'R', 'R', 'U', 'U', 'U', 'U', 'R', 'R', 'D', 'D', 'R', 'R', 'U', 'U', 'U', 'U', 'R', 'R', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'L', 'L', 'U', 'U', 'L', 'L', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'R', 'R', 'U', 'U', 'R', 'R', 'U', 'U', 'R', 'R', 'U', 'U', 'U', 'U', 'R', 'R', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D']

def read_user_moves(path="user_moves.txt"):
    try:
        with open(path) as f:
            content = f.read().strip()
            moves = [m.strip().upper() for m in content.split(",") if m.strip()]
            return moves
    except FileNotFoundError:
        print("user_moves.txt not found. Create it with your moves (comma-separated).")
        return None

def main():
    user_moves = read_user_moves("user_moves.txt")
    if user_moves is None:
        return
    if user_moves == correct_moves:
        print("✅ Correct path! You matched the official solution.")
        print("Move count:", len(correct_moves))
        print("Encoded (U=1,D=2,L=3,R=4):", ''.join(str({'U':1,'D':2,'L':3,'R':4}[m]) for m in correct_moves))
    else:
        print("❌ Incorrect path.")
        for i,(u,c) in enumerate(zip(user_moves, correct_moves), start=1):
            if u != c:
                print(f"First mismatch at step {i}: you={u} expected={c}")
                break
        else:
            if len(user_moves) != len(correct_moves):
                print("Your sequence matches the beginning of the correct path but lengths differ.")
            else:
                print("Sequence differs but no single-step mismatch found.")

if __name__ == '__main__':
    main()
