document.addEventListener("DOMContentLoaded", () => {
  const questions = [
    {
      question: "What is the largest planet in our solar system?",
      answers: [
        { text: "Earth", correct: false },
        { text: "Jupiter", correct: true },
        { text: "Mars", correct: false },
        { text: "Saturn", correct: false },
      ],
    },
    {
      question: "What is the closest star to Earth?",
      answers: [
        { text: "Proxima Centauri", correct: true },
        { text: "Sirius", correct: false },
        { text: "Alpha Centauri", correct: false },
        { text: "Betelgeuse", correct: false },
      ],
    },
    // Add more questions here
  ];

  const questionContainer = document.getElementById("question-container");
  const answerButtons = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  const scoreContainer = document.getElementById("score-container");
  const scoreElement = document.getElementById("score");

  let currentQuestionIndex = 0;
  let score = 0;

  nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      setNextQuestion();
    } else {
      showScore();
    }
  });

  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add("hidden");
    scoreContainer.classList.add("hidden");
    setNextQuestion();
  }

  function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
  }

  function showQuestion(question) {
    questionContainer.innerText = question.question;
    question.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.innerText = answer.text;
      button.classList.add("btn");
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
      answerButtons.appendChild(button);
    });
  }

  function resetState() {
    while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }
    nextButton.classList.add("hidden");
  }

  function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    if (correct) {
      score++;
    }
    Array.from(answerButtons.children).forEach((button) => {
      setStatusClass(button, button.dataset.correct);
    });
    if (questions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove("hidden");
    } else {
      nextButton.innerText = "Finish";
      nextButton.classList.remove("hidden");
    }
  }

  function setStatusClass(element, correct) {
    if (correct) {
      element.classList.add("correct");
    } else {
      element.classList.add("wrong");
    }
  }

  function showScore() {
    questionContainer.classList.add("hidden");
    answerButtons.classList.add("hidden");
    nextButton.classList.add("hidden");
    scoreContainer.classList.remove("hidden");
    scoreElement.innerText = score;
  }

  startQuiz();
});
