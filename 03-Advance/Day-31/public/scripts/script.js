// Main script for initialization and event listener setup
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup-form");
  const loginForm = document.getElementById("login-form");

  // Event listeners for signup and login forms
  if (signupForm) {
    signupForm.addEventListener("submit", handleSignup);
  }
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }
});
