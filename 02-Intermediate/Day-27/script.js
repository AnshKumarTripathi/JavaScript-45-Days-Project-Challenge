async function searchUsers() {
  const username = document.getElementById("username").value;
  const suggestions = document.getElementById("suggestions");

  if (username.length < 3) {
    suggestions.innerHTML = "";
    suggestions.style.display = "none";
    return;
  }

  const response = await fetch(
    `https://api.github.com/search/users?q=${username}`
  );
  const data = await response.json();

  suggestions.innerHTML = data.items
    .map(
      (user) => `
      <p onclick="selectUser('${user.login}')">
          <img src="${user.avatar_url}" alt="Avatar" width="30" height="30">
          ${user.login}
      </p>
  `
    )
    .join("");
  suggestions.style.display = "block";
}

function selectUser(username) {
  document.getElementById("username").value = username;
  document.getElementById("suggestions").innerHTML = "";
  document.getElementById("suggestions").style.display = "none";
  getProfile();
}

async function getProfile() {
  const username = document.getElementById("username").value;
  const profile = document.getElementById("profile");

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error("User not found");
    }
    const data = await response.json();

    profile.innerHTML = `
          <img src="${data.avatar_url}" alt="Avatar" width="100" height="100">
          <h2>${data.name}</h2>
          <p>${data.bio}</p>
          <p>Public Repos: ${data.public_repos}</p>
          <p>Followers: ${data.followers}</p>
          <p>Following: ${data.following}</p>
          <a href="${data.html_url}" target="_blank">View Profile on GitHub</a>
      `;
    profile.style.display = "block";
  } catch (error) {
    profile.innerHTML = `<p>${error.message}</p>`;
    profile.style.display = "block";
  }
}
