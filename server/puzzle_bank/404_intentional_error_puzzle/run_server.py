# run_server.py - Custom HTTP server that returns a clue on 404 responses
from http.server import SimpleHTTPRequestHandler, HTTPServer
import socketserver

class MyHandler(SimpleHTTPRequestHandler):
    def send_error(self, code, message=None, explain=None):
        # override to show custom 404 body with clue
        if code == 404:
            self.send_response(404, "Not Found")
            self.send_header("Content-type", "text/html; charset=utf-8")
            self.end_headers()
            body = "<html><head><title>404 Not Found</title></head><body><h1>404</h1><p>Clue: 404</p></body></html>"
            self.wfile.write(body.encode('utf-8'))
        else:
            super().send_error(code, message, explain)

if __name__ == '__main__':
    port = 8000
    server_address = ('', port)
    httpd = HTTPServer(server_address, MyHandler)
    print(f"Serving on http://localhost:{port}/  (press Ctrl+C to stop)")
    httpd.serve_forever()
