const http = require("http");

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("UserService");
});

server.listen(8009, "127.0.0.1", () => {
    console.log("Server is running");
});
