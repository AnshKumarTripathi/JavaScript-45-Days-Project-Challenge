const avatarForm = document.getElementById("avatar-form");
const currentAvatar = document.getElementById("current-avatar");
const newAvatarInput = document.getElementById("new-avatar");
const backToChatButton = document.getElementById("back-to-chat");

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const username = sessionStorage.getItem("username"); // Retrieve the username from session storage or other means
    // Fetch user profile information
    const response = await fetch(
      `/profile?username=${encodeURIComponent(username)}`
    );
    const result = await response.json();
    if (response.ok) {
      // currentAvatar.src = `/avatars/${result.avatar}`;
    } else {
      alert(result.error);
    }
  } catch (error) {
    alert("Error fetching profile information: " + error.message);
  }
});

avatarForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  // const avatarFile = newAvatarInput.files[0];
  const username = sessionStorage.getItem("username"); // Retrieve the username from session storage or other means

  const formData = new FormData();
  // if (avatarFile) {
  //   formData.append('avatar', avatarFile);
  // }

  try {
    // Update user avatar
    const response = await fetch(
      `/profile/avatar?username=${encodeURIComponent(username)}`,
      {
        method: "POST",
        body: formData,
      }
    );
    const message = await response.json();
    if (response.ok) {
      alert("Avatar updated successfully!");
      // currentAvatar.src = `/avatars/${message.avatar}`;
    } else {
      alert(message.error);
    }
  } catch (error) {
    alert("Error updating avatar: " + error.message);
  }
});

backToChatButton.addEventListener("click", () => {
  window.location.href = "/chat";
});
