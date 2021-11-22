// present user with start button
// start button needs to start the timer,
// go to first question and hide the start button
// the timer is running, you must click a button
// if the answer is correct move to next question
// if you're wrong move to next question and subtract time away

const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const result = document.getElementById("result");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
let shuffledQuestions, currentQuestionIndex;

// present user with the start button
startButton.addEventListener("click", startGame);

// increments in the array to select the next question
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

//start the game
// hides the start button
// shuffles the questions
// states the current question index as 0
// calls the setNextQuestion function
function startGame() {
  startButton.classList.add("hide");

  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

// resets the colors of the website
// returns the shuffled value that will
// determine which question that will be chosen
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// displayes the question
// creates buttons for each answer and
// assigns the text of each answer into a button
function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

// resets the colors of the website
// removes the appended child from the answerButtonsElement
function resetState() {
  nextButton.classList.add("hide");
  clearStatusClass(document.body);
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

//
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

// updates the classList elements to show if the answer is correct or wrong
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

// Resets the class list elements for the next question
function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

// stores the questions
const questions = [
  {
    question: "What is 2 + 2",
    answers: [
      { text: "4", correct: true },
      { text: "22", correct: false },
    ],
  },

  {
    question: "What is 3 + 2",
    answers: [
      { text: "5", correct: true },
      { text: "22", correct: false },
    ],
  },
];
