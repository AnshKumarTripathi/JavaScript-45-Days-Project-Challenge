require("dotenv").config();
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const User = require("./models/User");
const Message = require("./models/Message");
const Chatroom = require("./models/Chatroom");

// const upload = multer({ dest: 'public/avatars/' });

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));

// Signup Route
app.post(
  "/signup",
  /* upload.single('avatar'), */ async (req, res) => {
    const { username, password, email } = req.body;
    // const avatar = req.file ? req.file.filename : 'default.png';
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        username,
        password: hashedPassword,
        email /*, avatar */,
      });
      await user.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res
        .status(400)
        .json({ error: "Error registering user: " + error.message });
    }
  }
);

// Login Route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      res
        .status(200)
        .json({
          message: "User logged in successfully" /*, avatar: user.avatar */,
        });
    } else {
      res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(400).json({ error: "Error logging in: " + error.message });
  }
});

// Fetch Chatrooms
app.get("/chatrooms", async (req, res) => {
  try {
    const chatrooms = await Chatroom.find({});
    res.status(200).json(chatrooms);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error fetching chatrooms: " + error.message });
  }
});

// Create Chatroom
app.post("/chatrooms", async (req, res) => {
  const { roomName, topics } = req.body;
  try {
    const chatroom = new Chatroom({ roomName, topics });
    await chatroom.save();
    res.status(201).json({ message: "Chatroom created successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error creating chatroom: " + error.message });
  }
});

// Fetch Messages for a Chatroom
app.get("/chatrooms/:roomName/messages", async (req, res) => {
  const { roomName } = req.params;
  try {
    const messages = await Message.find({ chatroom: roomName })
      .sort({ timestamp: -1 })
      .limit(200)
      .exec();
    res.status(200).json(messages.reverse()); // Return messages in chronological order
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error fetching messages: " + error.message });
  }
});

// Profile Route
app.get("/profile", async (req, res) => {
  const username = req.query.username; // Assuming you pass the username as a query parameter
  try {
    const user = await User.findOne({ username });
    if (user) {
      res.status(200).json({
        /* avatar: user.avatar */
      });
    } else {
      res.status(400).json({ error: "User not found" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error fetching profile information: " + error.message });
  }
});

// Update Avatar Route
/* app.post("/profile/avatar", upload.single('avatar'), async (req, res) => {
  const username = req.query.username; // Assuming you pass the username as a query parameter
  const avatar = req.file ? req.file.filename : 'default.png';
  try {
    const user = await User.findOne({ username });
    if (user) {
      user.avatar = avatar;
      await user.save();
      res.status(200).json({ avatar: user.avatar });
    } else {
      res.status(400).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ error: "Error updating avatar: " + error.message });
  }
}); */

// WebSocket Connections
wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("message", async (message) => {
    console.log(`Received: ${message}`);
    try {
      const parsedMessage = JSON.parse(message);
      const { username, text, chatroom /*, avatar */ } = parsedMessage;

      // Validate that chatroom is set
      if (!chatroom) {
        console.warn("Chatroom is not set in the message.");
        return;
      }

      // Store message in database
      const newMessage = new Message({
        username,
        text,
        chatroom /*, avatar */,
      });
      await newMessage.save();

      // Broadcast message to all clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify({
              username,
              text,
              timestamp: newMessage.timestamp,
              chatroom,
              // avatar
            })
          );
        }
      });
    } catch (error) {
      console.error("Error processing message:", error);
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
