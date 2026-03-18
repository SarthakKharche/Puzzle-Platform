404 Intentional Error Puzzle - README

How to run:
1. Extract this folder and open a terminal in the folder.
2. Start the small server: python3 run_server.py
3. Open http://localhost:8000/index.html in your browser.

Task for participants:
- Edit only the file 'index.html' and make exactly ONE change so that a linked resource becomes missing.
  Example allowed changes:
    * Change the img src to a non-existent filename (e.g., images/missing.png)
    * Change the link href to a non-existent page (e.g., pages/missing.html)
- After making the change, reload the page and then open the missing resource directly (right-click broken image -> Open image in new tab, or click the link).
- The server will return a 404 page. The HTTP status code '404' is the clue for the next puzzle.

Notes for organizers:
- The server (run_server.py) returns a custom 404 page containing 'Clue: 404' to make the clue explicit.
- If you prefer the participant to discover the numeric code from the Network tab, instruct them to open DevTools -> Network and look for the failed request's status code.
- This format can be adapted for other HTTP codes (403, 500) by modifying run_server.py to include different clues.
