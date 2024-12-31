### `info.md`

# White Web Forum Project

## Project Overview

The White Web Forum is a simple yet modern web-based chat application. It allows users to sign up, log in, create chatrooms, and participate in real-time messaging with other users. The project leverages web technologies such as HTML, CSS, JavaScript, WebSocket, and MongoDB for database management.

## Project Structure

The project is structured as follows:

```
White Web Forum/
│
├── public/
│   ├── styles/
│   │   └── style.css
│   ├── scripts/
│   │   ├── auth.js
│   │   ├── chat.js
│   │   └── script.js
│   └── index.html
│
├── src/
│   ├── models/
│   │   ├── User.js
│   │   ├── Message.js
│   │   └── Chatroom.js
│   └── server.js
│
├── .env
├── package.json
└── info.md
```

### Directory Structure Explained

- `public/`: Contains the front-end resources.

  - `styles/`: Contains CSS files for styling the application.
    - `style.css`: The main stylesheet for the application.
  - `scripts/`: Contains JavaScript files for front-end logic.
    - `auth.js`: Handles user authentication (signup and login).
    - `chat.js`: Manages chatroom creation, message sending, and real-time messaging.
    - `script.js`: Main script for initialization and event listener setup.
  - `index.html`: The main HTML file for the application interface.

- `src/`: Contains the back-end resources.

  - `models/`: Contains Mongoose models for MongoDB.
    - `User.js`: Defines the schema for user data.
    - `Message.js`: Defines the schema for chat messages.
    - `Chatroom.js`: Defines the schema for chatrooms.
  - `server.js`: The main server file, handling API routes and WebSocket connections.

- `.env`: Environment configuration file for sensitive data (e.g., database connection URI).
- `package.json`: Defines project dependencies and scripts.
- `info.md`: This file, providing detailed information about the project.

## Detailed Explanation of Key Files

### `index.html`

The main HTML file provides the structure of the web application, including forms for signup and login, and containers for chatrooms and messages. It includes external CSS for styling and JavaScript for functionality.

### `style.css`

The main stylesheet defines the look and feel of the application. It ensures a modern, clean, and responsive design. Key styles include:

- General styles for body, headings, and form elements.
- Styling for the chat container, chat window, messages, and buttons.
- The emoji picker is set to a maximum height of 400px with scrolling enabled.

### `auth.js`

Handles user authentication:

- `handleSignup(e)`: Manages the signup process by sending user details to the server.
- `handleLogin(e)`: Manages the login process by verifying user credentials with the server.

### `chat.js`

Manages chat functionality:

- `fetchChatrooms()`: Fetches and displays available chatrooms.
- `navigateToChatroom(roomName)`: Navigates to a selected chatroom.
- `fetchMessages(roomName)`: Fetches messages for a chatroom.
- `sendMessage()`: Sends a new message to the chatroom.
- `handleMessage(event)`: Handles incoming messages from WebSocket.
- Emoji picker setup with a maximum height of 400px.

### `script.js`

Main script for initialization and setting up event listeners. It connects the forms in `index.html` with the corresponding functions in `auth.js` and `chat.js`.

### `server.js`

The main server file:

- Connects to MongoDB using Mongoose.
- Defines API routes for signup, login, chatroom creation, and message fetching.
- Manages WebSocket connections for real-time messaging.

### `models/`

Contains the Mongoose models:

- `User.js`: Defines the schema for user data, including username, password, and email.
- `Message.js`: Defines the schema for chat messages, including username, text, and chatroom.
- `Chatroom.js`: Defines the schema for chatrooms, including room name and topics.

## Getting Started

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up the `.env` file with your MongoDB URI.
4. Start the server using `node src/server.js`.
5. Open `index.html` in your browser to access the application.

## Dependencies

- Express: For server-side routing and middleware.
- WebSocket: For real-time communication.
- Mongoose: For MongoDB object modeling.
- bcrypt: For password hashing.
- multer: For handling file uploads (commented out in the current version).

## Conclusion

The White Web Forum provides a simple yet powerful platform for real-time messaging. The project is structured to ensure modularity and ease of maintenance. The codebase is well-documented, making it easy for developers to understand and contribute to the project.

Feel free to explore the code and make enhancements as needed. If you encounter any issues or have suggestions for improvements, please let us know!

---
