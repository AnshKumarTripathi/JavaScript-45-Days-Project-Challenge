const questions = [
  {
    question: "Who is the father of computer security?",
    answers: ["August Kerckhoffs", "Bob Thomas", "Robert", "Charles"],
    correct: "August Kerckhoffs",
  },
  {
    question: "What is a common type of cyber attack?",
    answers: ["Phishing", "Jogging", "Reading", "Coding"],
    correct: "Phishing",
  },
  {
    question: "What does a firewall do?",
    answers: ["Cooks food", "Protects network", "Sends emails", "Makes calls"],
    correct: "Protects network",
  },
  {
    question: "Which of these is a strong password?",
    answers: ["12345", "password", "Pa$$w0rd!", "abc123"],
    correct: "Pa$$w0rd!",
  },
  {
    question: "What is the main purpose of encryption?",
    answers: [
      "To decorate data",
      "To protect data",
      "To speed up data",
      "To delete data",
    ],
    correct: "To protect data",
  },
  {
    question: "What is malware?",
    answers: [
      "A type of software",
      "A type of hardware",
      "A type of network",
      "A type of user",
    ],
    correct: "A type of software",
  },
  {
    question: "What does VPN stand for?",
    answers: [
      "Virtual Private Network",
      "Very Private Network",
      "Virtual Public Network",
      "Very Public Network",
    ],
    correct: "Virtual Private Network",
  },
  {
    question: "What is phishing?",
    answers: [
      "A method of fishing",
      "A method to steal data",
      "A type of encryption",
      "A secure network protocol",
    ],
    correct: "A method to steal data",
  },
  {
    question: "What does 2FA stand for?",
    answers: [
      "Two-Factor Authentication",
      "Two-Factor Authorization",
      "Two-Factor Access",
      "Two-Factor Allocation",
    ],
    correct: "Two-Factor Authentication",
  },
  {
    question: "What is the purpose of a password manager?",
    answers: [
      "To create strong passwords",
      "To store and manage passwords",
      "To hack passwords",
      "To delete passwords",
    ],
    correct: "To store and manage passwords",
  },
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
  const quizContent = document.getElementById("quiz-content");
  quizContent.innerHTML = `
    <h3 class="question">${questions[currentQuestion].question}</h3>
    <div class="btn-container">
      ${questions[currentQuestion].answers
        .map(
          (answer) => `
        <button class="answer-btn" onclick="checkAnswer('${answer}')">${answer}</button>
      `
        )
        .join("")}
    </div>
  `;
}

function checkAnswer(selectedAnswer) {
  const buttons = document.querySelectorAll(".answer-btn");
  buttons.forEach((button) => {
    if (button.innerText === questions[currentQuestion].correct) {
      button.classList.add("correct");
    } else if (button.innerText === selectedAnswer) {
      button.classList.add("incorrect");
    }
    button.disabled = true;
  });

  if (selectedAnswer === questions[currentQuestion].correct) {
    score++;
  }

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      if (score >= 7) {
        document.getElementById("quiz-content").innerHTML = `
          <h3 class="question">Congratulations! You scored ${score} out of 10!</h3>
          <div id="congratulations">
            🎉 You're a Cyber Security Genius! 🎉
          </div>
        `;
      } else {
        document.getElementById("quiz-content").innerHTML = `
          <h3 class="question">You scored ${score} out of 10. Try again to improve your score!</h3>
        `;
      }
    }
  }, 1000);
}

// Load the first question when the page loads
window.onload = loadQuestion;
