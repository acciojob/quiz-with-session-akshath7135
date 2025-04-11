// Reference to the questions container and submit button
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Quiz Questions Array
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Load saved progress from session storage
function loadProgress() {
  const savedAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};
  return savedAnswers;
}

// Render quiz questions
function renderQuestions() {
  const savedAnswers = loadProgress();
  questionsElement.innerHTML = "";

  questions.forEach((question, index) => {
    const questionElement = document.createElement("div");
    questionElement.innerHTML = `<p>${index + 1}. ${question.question}</p>`;

    question.choices.forEach((choice) => {
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${index}`);
      choiceElement.setAttribute("value", choice);

      // If this choice was selected before, check it
      if (savedAnswers[index] === choice) {
        choiceElement.checked = true;
      }

      // Save the answer in session storage when changed
      choiceElement.addEventListener("change", () => {
        const answers = loadProgress();
        answers[index] = choice;
        sessionStorage.setItem("progress", JSON.stringify(answers));
      });

      // Create label for better UI
      const choiceLabel = document.createElement("label");
      choiceLabel.appendChild(choiceElement);
      choiceLabel.append(` ${choice}`);

      questionElement.appendChild(choiceLabel);
      questionElement.appendChild(document.createElement("br"));
    });

    questionsElement.appendChild(questionElement);
  });
}

// Function to calculate score
function calculateScore() {
  const savedAnswers = loadProgress();
  let score = 0;

  questions.forEach((question, index) => {
    if (savedAnswers[index] === question.answer) {
      score++;
    }
  });

  return score;
}

// Handle quiz submission
submitButton.addEventListener("click", () => {
  const finalScore = calculateScore();
  localStorage.setItem("score", finalScore); // Store score in local storage
  scoreElement.textContent = `Your score is ${finalScore} out of ${questions.length}.`;
});

// Display saved score if exists
function displaySavedScore() {
  const savedScore = localStorage.getItem("score");
  if (savedScore !== null) {
    scoreElement.textContent = `Your last score was ${savedScore} out of ${questions.length}.`;
  }
}

// Initial setup
renderQuestions();
displaySavedScore();
