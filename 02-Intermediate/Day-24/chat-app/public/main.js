const socket = new WebSocket("ws://localhost:8080");
const chat = document.getElementById("chat");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");

socket.addEventListener("open", () => {
  chat.innerHTML += "<p>Connected to server</p>";
});

socket.addEventListener("message", (event) => {
  chat.innerHTML += `<p>${event.data}</p>`;
});

socket.addEventListener("close", () => {
  chat.innerHTML += "<p>Disconnected from server</p>";
});

sendButton.addEventListener("click", () => {
  const message = messageInput.value;
  socket.send(message);
  chat.innerHTML += `<p>You: ${message}</p>`;
  messageInput.value = "";
});
