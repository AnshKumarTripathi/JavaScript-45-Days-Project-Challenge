const WebSocket = require("ws");
const server = new WebSocket.Server({ port: 8080 });

server.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("message", (message) => {
    console.log(`Received: ${message}`);
    socket.send(`Server: ${message}`);
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server started on port 8080");