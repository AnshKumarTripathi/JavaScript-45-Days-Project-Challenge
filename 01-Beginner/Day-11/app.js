document.addEventListener("DOMContentLoaded", () => {
  createShootingStars(50); // Create 50 shooting stars
});

function createShootingStars(count) {
  const starsContainer = document.getElementById("stars-container");
  for (let i = 0; i < count; i++) {
    const star = document.createElement("div");
    star.classList.add("falling-star");
    star.style.left = `${Math.random() * 100}vw`;
    star.style.animationDuration = `${Math.random() * 2 + 1}s`;
    star.style.animationDelay = `${Math.random() * 5}s`;
    starsContainer.appendChild(star);
  }
}

// Function to calculate and display word count
function calculateWordCount() {
  const text = getTextInput();
  const wordsArray = processText(text);
  const wordCount = countWords(wordsArray);
  displayWordCount(wordCount);
}

// Function to capture user input
function getTextInput() {
  return document.getElementById("textInput").value;
}

// Function to process the text
function processText(text) {
  text = text.replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s+/g, " ");
  return text.trim().split(" ");
}

// Function to count words
function countWords(wordsArray) {
  return wordsArray.filter((word) => word.length > 0).length;
}

// Function to display word count
function displayWordCount(wordCount) {
  document.getElementById("wordCount").innerText = `Word Count: ${wordCount}`;
}

// Function to adjust the height of the textarea
function adjustHeight(textarea) {
  textarea.style.height = "auto";
  textarea.style.height =
    (textarea.scrollHeight <= 800 ? textarea.scrollHeight : 800) + "px";
  textarea.style.overflowY = textarea.scrollHeight > 800 ? "scroll" : "hidden";
}
