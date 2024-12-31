const authContainer = document.getElementById("auth-container");
const chatContainer = document.getElementById("chat-container");
const usernameInput = document.getElementById("username");

async function handleSignup(e) {
  e.preventDefault();
  const username = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;
  const email = document.getElementById("signup-email").value;
  // const avatarFile = document.getElementById("signup-avatar").files[0];

  console.log("Signup form submitted with:", {
    username,
    password,
    email /* , avatarFile */,
  }); // Debugging log

  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  formData.append("email", email);
  // if (avatarFile) {
  //   formData.append('avatar', avatarFile);
  // }

  try {
    const response = await fetch("/signup", {
      method: "POST",
      body: formData,
    });
    const message = await response.json();
    alert(message.message || message.error);
  } catch (error) {
    alert("Error: " + error.message);
  }
}

async function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

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
        // usernameInput.setAttribute("data-avatar", result.avatar); // Store the avatar in data attribute
        sessionStorage.setItem("username", username); // Store username in session storage for profile usage
      }
      fetchChatrooms();
    }
    alert(result.message || result.error);
  } catch (error) {
    alert("Error: " + error.message);
  }
}
