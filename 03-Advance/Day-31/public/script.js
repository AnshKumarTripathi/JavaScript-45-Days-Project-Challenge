const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");
const authContainer = document.getElementById("auth-container");
const chatContainer = document.getElementById("chat-container");
const chatroomContainer = document.getElementById("chatroom-container");
const chatroomsDiv = document.getElementById("chatrooms");
const createChatroomForm = document.getElementById("create-chatroom-form");
const usernameInput = document.getElementById("username");
const messageInput = document.getElementById("message");
const sendButton = document.getElementById("send");
const output = document.getElementById("output");
const feedback = document.getElementById("feedback");
const chatWindow = document.getElementById("chat-window");
const refreshChatroomsButton = document.getElementById("refresh-chatrooms");
const backToChatroomsButton = document.getElementById("back-to-chatrooms");
const refreshMessagesButton = document.getElementById("refresh-messages"); // Refresh messages button

const ws = new WebSocket(`ws://${window.location.host}`);

console.log("Script loaded"); // Debugging log

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;
  const email = document.getElementById("signup-email").value;

  console.log("Signup form submitted with:", { username, password, email }); // Debugging log

  try {
    const response = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, email }),
    });
    const message = await response.json();
    alert(message.message || message.error);
  } catch (error) {
    alert("Error: " + error.message);
  }
});
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  console.log("Before Login:");
  console.log(
    "usernameInput value:",
    usernameInput ? usernameInput.value : null
  );
  console.log(
    "usernameInput data-username:",
    usernameInput ? usernameInput.getAttribute("data-username") : null
  );

  console.log("Login form submitted with:", { username, password }); // Debugging log

  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const result = await response.json();
    console.log("Login response:", result); // Debugging log
    if (response.ok) {
      authContainer.style.display = "none";
      chatContainer.style.display = "block";
      if (usernameInput) {
        usernameInput.value = username;
        usernameInput.setAttribute("data-username", username); // Store the username in data attribute
        console.log("After Login:");
        console.log(
          "usernameInput value:",
          usernameInput ? usernameInput.value : null
        );
        console.log(
          "usernameInput data-username:",
          usernameInput ? usernameInput.getAttribute("data-username") : null
        );
      }
      fetchChatrooms();
    }
    alert(result.message || result.error);
  } catch (error) {
    alert("Error: " + error.message);
  }
});

createChatroomForm.addEventListener("submit", async (e) => {
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
});

// Refresh chatrooms on button click
refreshChatroomsButton.addEventListener("click", fetchChatrooms);

// Refresh messages on button click
refreshMessagesButton.addEventListener("click", () => {
  const chatroom = usernameInput
    ? usernameInput.getAttribute("data-chatroom")
    : null;
  if (chatroom) {
    fetchMessages(chatroom);
    console.log("Refreshed messages for chatroom:", chatroom); // Debugging log
  } else {
    alert("Chatroom not set");
  }
});

// Back to chatrooms on button click
backToChatroomsButton.addEventListener("click", () => {
  chatroomContainer.style.display = "block";
  chatWindow.style.display = "none";
  console.log("Navigated back to chatrooms"); // Debugging log
});

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
      output.innerHTML += `<p><strong>${message.username}: </strong>${
        message.text
      } <em>${new Date(message.timestamp).toLocaleString()}</em></p>`;
    });
  } catch (error) {
    alert("Error fetching messages: " + error.message);
  }
}

sendButton.addEventListener("click", () => {
  const username = usernameInput
    ? usernameInput.getAttribute("data-username")
    : null; // Use data attribute to retrieve username
  const chatroom = usernameInput
    ? usernameInput.getAttribute("data-chatroom")
    : null;
  const text = messageInput ? messageInput.value : null;

  console.log("Before Sending Message:");
  console.log(
    "usernameInput value:",
    usernameInput ? usernameInput.value : null
  );
  console.log(
    "usernameInput data-username:",
    usernameInput ? usernameInput.getAttribute("data-username") : null
  );
  console.log(
    "usernameInput data-chatroom:",
    usernameInput ? usernameInput.getAttribute("data-chatroom") : null
  );

  console.log("Send button clicked with:", { username, chatroom, text }); // Debugging log

  if (username && chatroom && text) {
    const message = { username, chatroom, text };
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
});

ws.onmessage = (event) => {
  try {
    const message = JSON.parse(event.data);
    console.log("Received message:", message); // Debugging log
    if (message.username && message.text && message.text !== "typing...") {
      output.innerHTML += `<p><strong>${message.username}: </strong>${
        message.text
      } <em>${new Date(message.timestamp).toLocaleString()}</em></p>`;
      feedback.innerHTML = "";
    }
  } catch (error) {
    console.error("Error parsing message:", error);
  }
};

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
