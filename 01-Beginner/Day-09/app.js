document
  .getElementById("checkPalindrome")
  .addEventListener("click", palindromeChecker);

function palindromeChecker() {
  const inputText = document.getElementById("input").value;
  const resultElement = document.getElementById("result");
  const titleText = document.getElementById("title");
  const bodyElement = document.body;

  // Normalize the input text
  const lowerInputText = inputText.toLowerCase();
  const cleanLowerInputText = lowerInputText.replace(/[^a-zA-Z0-9]/g, "");

  // Check if palindrome
  const isPalindrome =
    cleanLowerInputText === cleanLowerInputText.split("").reverse().join("");

  // Display result and change background color
  if (isPalindrome) {
    resultElement.innerText = "Palindrome";
    resultElement.className = "result green";
    titleText.style.color = "#ffffff";
    bodyElement.style.backgroundColor = "#024b30";
  } else {
    resultElement.innerText = "Not a palindrome";
    resultElement.className = "result red";
    titleText.style.color = "#ffffff";
    bodyElement.style.backgroundColor = "#700000";
  }
}
