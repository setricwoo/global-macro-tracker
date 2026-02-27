"""
全球宏观事件追踪系统 - 本地服务器
运行后可在局域网内访问
"""
import http.server
import socketserver
import webbrowser
import os

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

if __name__ == "__main__":
    os.chdir(DIRECTORY)

    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"""
╔══════════════════════════════════════════════════════════════╗
║          全球宏观事件追踪系统 - 本地服务器                      ║
╠══════════════════════════════════════════════════════════════╣
║  本地访问: http://localhost:{PORT}                              ║
║  局域网访问: http://你的IP地址:{PORT}                            ║
╠══════════════════════════════════════════════════════════════╣
║  按 Ctrl+C 停止服务器                                          ║
╚══════════════════════════════════════════════════════════════╝
        """)

        # 自动打开浏览器
        webbrowser.open(f"http://localhost:{PORT}")

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n服务器已停止")
