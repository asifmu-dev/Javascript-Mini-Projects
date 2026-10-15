
const questions = [
    {
        question: "Which keyword declares a variable that cannot be reassigned?",
        options: ["var", "let", "const", "static"],
        answer: "const"
    },
    {
        question: "Which method creates a new array by transforming each element?",
        options: ["forEach()", "map()", "push()", "pop()"],
        answer: "map()"
    },
    {
        question: "Which symbol is used for an arrow function?",
        options: ["=>", "->", "::", "**"],
        answer: "=>"
    },
    {
        question: "Which operator checks both value and type?",
        options: ["==", "=", "===", "!="],
        answer: "==="
    },
    {
        question: "Which array method adds an element to the end?",
        options: ["shift()", "pop()", "unshift()", "push()"],
        answer: "push()"
    }
];

// DOM elements
const questionElement = document.querySelector("#question");
const optionsElement = document.querySelector("#options");
const questionCount = document.querySelector("#question-count");
const scoreElement = document.querySelector("#score");
const progressElement = document.querySelector("#progress");
const feedbackElement = document.querySelector("#feedback");
const nextButton = document.querySelector("#next-btn");
const restartButton = document.querySelector("#restart-btn");
const quizScreen = document.querySelector("#quiz-screen");
const resultScreen = document.querySelector("#result-screen");
const resultMessage = document.querySelector("#result-message");
const finalScore = document.querySelector("#final-score");

// Quiz state
let currentQuestionIndex = 0;
let score = 0;
let answerSelected = false;

// Display the current question
const showQuestion = () => {
    answerSelected = false;

    const currentQuestion = questions[currentQuestionIndex];
    const { question, options } = currentQuestion;

    questionElement.textContent = question;
    questionCount.textContent =
        `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    scoreElement.textContent = `Score: ${score}`;

    progressElement.style.width =
        `${(currentQuestionIndex / questions.length) * 100}%`;

    feedbackElement.textContent = "";
    feedbackElement.className = "feedback";

    nextButton.disabled = true;
    nextButton.textContent =
        currentQuestionIndex === questions.length - 1
            ? "See Results →"
            : "Next Question →";

    optionsElement.innerHTML = "";

    options.forEach((option) => {
        const button = document.createElement("button");

        button.textContent = option;
        button.classList.add("option-btn");
        button.type = "button";

        button.addEventListener("click", () => {
            checkAnswer(button, option);
        });

        optionsElement.append(button);
    });
};

// Check the selected answer
const checkAnswer = (selectedButton, selectedOption) => {
    if (answerSelected) return;

    answerSelected = true;

    const correctAnswer = questions[currentQuestionIndex].answer;
    const isCorrect = selectedOption === correctAnswer;

    if (isCorrect) {
        score++;
        selectedButton.classList.add("correct");
        feedbackElement.textContent = "Correct! Great job 🎉";
        feedbackElement.classList.add("success");
    } else {
        selectedButton.classList.add("wrong");
        feedbackElement.textContent = `Incorrect! Answer: ${correctAnswer}`;
        feedbackElement.classList.add("error");
    }

    // Disable all options after answering
    optionsElement.querySelectorAll(".option-btn").forEach((button) => {
        button.disabled = true;

        if (button.textContent === correctAnswer) {
            button.classList.add("correct");
        }
    });

    scoreElement.textContent = `Score: ${score}`;
    nextButton.disabled = false;
};

// Move to the next question or results
const nextQuestion = () => {
    if (!answerSelected) return;

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
};

// Display the final result
const showResults = () => {
    quizScreen.hidden = true;
    resultScreen.hidden = false;

    progressElement.style.width = "100%";

    const percentage = Math.round((score / questions.length) * 100);

    finalScore.textContent = `${score} / ${questions.length} (${percentage}%)`;

    resultMessage.textContent =
        percentage >= 80
            ? "Excellent! You know your JavaScript well."
            : percentage >= 50
                ? "Good effort! Keep practicing."
                : "Keep learning! Practice makes progress.";
};

// Restart the quiz
const restartQuiz = () => {
    currentQuestionIndex = 0;
    score = 0;
    answerSelected = false;

    quizScreen.hidden = false;
    resultScreen.hidden = true;

    showQuestion();
};

// Event listeners
nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", restartQuiz);

// Start the quiz
showQuestion();
