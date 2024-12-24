const buttons = document.querySelectorAll(".btn");
const resetButton = document.querySelector(".reset-btn");
let shuffledNumbers = shuffleArray([...Array(8).keys(), ...Array(8).keys()]);
let revealedButtons = [];
let moves = 0;

buttons.forEach((button, index) => {
  button.dataset.number = shuffledNumbers[index];
  button.addEventListener("click", revealNumber);
});

resetButton.addEventListener("click", resetGame);

function revealNumber(event) {
  const button = event.target;
  if (revealedButtons.length < 2 && !button.classList.contains("revealed")) {
    button.textContent = button.dataset.number;
    button.classList.add("revealed");
    revealedButtons.push(button);

    if (revealedButtons.length === 2) {
      checkForMatch();
    }
  }
}

function checkForMatch() {
  moves++;
  const [button1, button2] = revealedButtons;
  if (button1.dataset.number === button2.dataset.number) {
    button1.classList.add("matched");
    button2.classList.add("matched");
    revealedButtons = [];
    checkIfGameOver();
  } else {
    setTimeout(() => {
      button1.textContent = "";
      button2.textContent = "";
      button1.classList.remove("revealed");
      button2.classList.remove("revealed");
      revealedButtons = [];
    }, 1000);
  }
}

function checkIfGameOver() {
  if (document.querySelectorAll(".matched").length === buttons.length) {
    alert(`Game over! Total moves: ${moves}`);
  }
}

function resetGame() {
  moves = 0;
  shuffledNumbers = shuffleArray([...Array(8).keys(), ...Array(8).keys()]);
  buttons.forEach((button, index) => {
    button.textContent = "";
    button.classList.remove("revealed", "matched");
    button.dataset.number = shuffledNumbers[index];
  });
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
