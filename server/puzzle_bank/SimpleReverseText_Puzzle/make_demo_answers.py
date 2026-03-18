# Generates answers.txt using the official solution.
from pathlib import Path

base = Path(__file__).parent
solution = (base / "organizer_solution.txt").read_text(encoding="utf-8").splitlines()
(out := base / "answers.txt").write_text("\n".join(solution), encoding="utf-8")
print(f"Wrote demo answers to {out}")
