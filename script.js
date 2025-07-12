
const questions = [
  {
    question: "Which is the largest animal in the world?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue Whale", correct: true},
      { text: "Elephant", correct: false },
      { text: "Giraffee", correct: false },
    ]
  },
  { 
    question:"What is the largest planet in our solar system?",
    answers:[
      {text: "Earth", correct:false },
      {text: "Jupiter", correct:true},
      {text: "Mars", correct:false },
      {text: "Neptune", correct:false },
    ]
  },
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
      { text: "Paris", correct: true },
      { text: "Rome", correct: false },
    ]
  },
  { 
    question: "What is 5*2 ?",
    answers:[
      {text: "7", correct:false },
      {text: "25", correct:false},
      {text: "10", correct:true },
      {text: "52", correct:false },
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
   currentQuestionIndex = 0;
   score = 0;
   nextButton.innerHTML = "Next";
   showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(answer));
    answerButton.appendChild(button);
  });
}

function selectAnswer(answer) {
  const buttons = answerButton.children;
  for (let btn of buttons) {
    btn.disabled = true; 
    const correct = questions[currentQuestionIndex].answers.find(a => a.text === btn.innerText).correct;
    if (correct) {
      btn.classList.add("correct");
    } else {
      btn.classList.add("incorrect");
    }
  }

  if (answer.correct) {
    score++;
  }

  nextButton.style.display = "block";
}



function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
  answerButton.removeChild(answerButton.firstChild);
  }
}

nextButton.addEventListener("click", () => {
  if (nextButton.innerHTML === "Play Again") {
    startQuiz();
    return;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

startQuiz();





