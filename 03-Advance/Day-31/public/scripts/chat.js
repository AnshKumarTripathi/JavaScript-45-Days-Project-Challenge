const chatroomContainer = document.getElementById("chatroom-container");
const chatroomsDiv = document.getElementById("chatrooms");
const createChatroomForm = document.getElementById("create-chatroom-form");
const sendButton = document.getElementById("send");
const output = document.getElementById("output");
const feedback = document.getElementById("feedback");
const chatWindow = document.getElementById("chat-window");
const refreshChatroomsButton = document.getElementById("refresh-chatrooms");
const backToChatroomsButton = document.getElementById("back-to-chatrooms");
const refreshMessagesButton = document.getElementById("refresh-messages");
const messageInput = document.getElementById("message");

createChatroomForm.addEventListener("submit", createChatroom);
refreshChatroomsButton.addEventListener("click", fetchChatrooms);
refreshMessagesButton.addEventListener("click", refreshMessages);
backToChatroomsButton.addEventListener("click", navigateToChatrooms);
sendButton.addEventListener("click", sendMessage);

const ws = new WebSocket(`ws://${window.location.host}`);

ws.onmessage = handleMessage;

async function fetchChatrooms() {
  console.log("Fetching chatrooms..."); // Debugging log
  try {
    const response = await fetch("/chatrooms");
    console.log("Fetch chatrooms response:", response); // Debugging log
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const chatrooms = await response.json();
    console.log("Chatrooms fetched:", chatrooms); // Debugging log
    chatroomsDiv.innerHTML = "";
    chatrooms.forEach((chatroom) => {
      const button = document.createElement("button");
      button.textContent = chatroom.roomName;
      button.classList.add("chatroom-button");
      button.addEventListener("click", () =>
        navigateToChatroom(chatroom.roomName)
      );
      chatroomsDiv.appendChild(button);
    });
  } catch (error) {
    alert("Error fetching chatrooms: " + error.message);
  }
}

function navigateToChatroom(roomName) {
  alert("Navigating to chatroom: " + roomName);
  chatroomContainer.style.display = "none";
  chatWindow.style.display = "block";
  console.log("Before Navigating to Chatroom:");
  console.log(
    "usernameInput value:",
    usernameInput ? usernameInput.value : null
  );
  console.log(
    "usernameInput data-username:",
    usernameInput ? usernameInput.getAttribute("data-username") : null
  );
  if (usernameInput) {
    usernameInput.setAttribute("data-chatroom", roomName);
    console.log("After Navigating to Chatroom:");
    console.log(
      "usernameInput data-chatroom:",
      usernameInput ? usernameInput.getAttribute("data-chatroom") : null
    );
  }
  console.log("Navigated to chatroom:", roomName); // Debugging log
}

function navigateToChatrooms() {
  chatroomContainer.style.display = "block";
  chatWindow.style.display = "none";
  console.log("Navigated back to chatrooms"); // Debugging log
}

async function fetchMessages(roomName) {
  console.log("Fetching messages for chatroom:", roomName); // Debugging log
  try {
    const response = await fetch(`/chatrooms/${roomName}/messages`);
    console.log("Fetch messages response:", response); // Debugging log
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const messages = await response.json();
    console.log("Messages fetched:", messages); // Debugging log
    output.innerHTML = "";
    messages.forEach((message) => {
      // const avatar = message.avatar || 'default.png';
      output.innerHTML += `<div class="chat-message"><strong>${
        message.username
      }:</strong> ${message.text} <em>${new Date(
        message.timestamp
      ).toLocaleString()}</em></div>`;
    });
  } catch (error) {
    alert("Error fetching messages: " + error.message);
  }
}

async function createChatroom(e) {
  e.preventDefault();
  const roomName = document.getElementById("new-chatroom-name").value;
  const topics = document
    .getElementById("new-chatroom-topics")
    .value.split(",");

  console.log("Create chatroom form submitted with:", { roomName, topics }); // Debugging log

  try {
    const response = await fetch("/chatrooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomName, topics }),
    });
    const result = await response.json();
    console.log("Create chatroom response:", result); // Debugging log
    if (response.ok) {
      fetchChatrooms();
      alert(result.message);
    } else {
      alert("Error creating chatroom: " + result.error);
    }
  } catch (error) {
    alert("Error: " + error.message);
  }
}

async function refreshMessages() {
  const chatroom = usernameInput
    ? usernameInput.getAttribute("data-chatroom")
    : null;
  if (chatroom) {
    await fetchMessages(chatroom);
    console.log("Refreshed messages for chatroom:", chatroom); // Debugging log
  } else {
    alert("Chatroom not set");
  }
}

function sendMessage() {
  const username = usernameInput
    ? usernameInput.getAttribute("data-username")
    : null; // Use data attribute to retrieve username
  const chatroom = usernameInput
    ? usernameInput.getAttribute("data-chatroom")
    : null;
  // const avatar = usernameInput
  //   ? usernameInput.getAttribute("data-avatar")
  //   : 'default.png';
  const text = messageInput ? messageInput.value : null;

  console.log("Send button clicked with:", {
    username,
    chatroom,
    text /*, avatar */,
  }); // Debugging log

  if (username && chatroom && text) {
    const message = { username, chatroom, text /*, avatar */ };
    console.log("Sending message:", message); // Debugging log
    ws.send(JSON.stringify(message)); // Send message as a JSON string
    messageInput.value = "";
  } else {
    console.error("User not logged in or message input is missing", {
      username,
      chatroom,
      text,
    }); // Debugging log
    alert("User not logged in or message input is missing");
  }
}

function handleMessage(event) {
  try {
    const message = JSON.parse(event.data);
    console.log("Received message:", message); // Debugging log
    if (message.username && message.text && message.text !== "typing...") {
      // const avatar = message.avatar || 'default.png';
      output.innerHTML += `<div class="chat-message"><strong>${
        message.username
      }:</strong> ${message.text} <em>${new Date(
        message.timestamp
      ).toLocaleString()}</em></div>`;
      feedback.innerHTML = "";
    }
  } catch (error) {
    console.error("Error parsing message:", error);
  }
}

if (messageInput) {
  messageInput.addEventListener("keypress", () => {
    const username = usernameInput
      ? usernameInput.getAttribute("data-username")
      : null; // Use data attribute to retrieve username
    if (username) {
      const typingMessage = { username, text: "typing..." };
      console.log("Sending typing notification:", typingMessage); // Debugging log
      ws.send(JSON.stringify(typingMessage)); // Send typing notification as a JSON string
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const picker = new window.EmojiMart.Picker({
    onEmojiSelect: (emoji) => {
      messageInput.value += emoji.native;
    },
  });
  picker.style.maxHeight = "400px"; // Set maximum height
  picker.style.overflowY = "auto"; // Enable vertical scrolling if content exceeds maxHeight
  document.body.appendChild(picker);

  // Hide picker by default
  picker.style.display = "none";

  const emojiButton = document.createElement("button");
  emojiButton.textContent = "😀";
  emojiButton.addEventListener("click", () => {
    picker.style.display = picker.style.display === "none" ? "block" : "none";
  });

  chatContainer.appendChild(emojiButton);
});
