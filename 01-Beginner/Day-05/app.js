// API Endpoint
const apiURL = "https://api.quotable.io/random";

// Function to fetch a random quote from the API
async function fetchRandomQuote() {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching quote:", error);
  }
}

// Function to display the quote
async function displayQuote() {
  const quoteElement = document.getElementById("quote");
  const authorElement = document.getElementById("author");
  const randomQuote = await fetchRandomQuote();
  if (randomQuote) {
    quoteElement.innerText = `"${randomQuote.content}"`;
    authorElement.innerText = `- ${randomQuote.author}`;
  } else {
    quoteElement.innerText = "Sorry, we couldn't fetch a quote at this time.";
    authorElement.innerText = "";
  }
}

// Event Listener for Page Load
window.addEventListener("load", displayQuote);
