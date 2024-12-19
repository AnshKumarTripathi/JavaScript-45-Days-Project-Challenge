const choices = { 1: "Rock", 2: "Paper", 3: "Scissors" };
const buttons = document.querySelectorAll(".choice-button");

buttons.forEach((button) => {
  button.addEventListener("click", () => gamePlay(button.id));
});

function gamePlay(playerChoice) {
  const userChoiceNum = Object.keys(choices).find(
    (key) => choices[key].toLowerCase() === playerChoice
  );
  const randomIndex = Math.floor(Math.random() * 3) + 1;
  const computerChoice = choices[randomIndex];

  document.getElementById("playerChoice").innerText = choices[userChoiceNum];
  document.getElementById("computerChoice").innerText = computerChoice;

  const winningCondition = [
    [1, 3], // Rock beats Scissors
    [2, 1], // Paper beats Rock
    [3, 2], // Scissors beat Paper
  ];

  const combinationForPlayer = [parseInt(userChoiceNum), randomIndex];
  const combinationForComputer = [randomIndex, parseInt(userChoiceNum)];

  let result = "Draw";

  for (let condition of winningCondition) {
    if (
      condition[0] === combinationForPlayer[0] &&
      condition[1] === combinationForPlayer[1]
    ) {
      result = "Player Win";
      break;
    }
    if (
      condition[0] === combinationForComputer[0] &&
      condition[1] === combinationForComputer[1]
    ) {
      result = "Computer Win";
      break;
    }
  }

  document.getElementById("result").innerText = result;
}
