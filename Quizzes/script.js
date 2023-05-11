var currentQuestionIndex = 0;
var questions = [];
var states = [];
var questionContainer = null;
var nextButton = null;

// Load JSON data and initialize the quiz
function initializeQuiz() {
    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            questions = data.questions;
            states = data.states;
            shuffleQuestions(); // Randomize the order of questions
            loadQuestion(currentQuestionIndex);
        })
        .catch(error => {
            console.log('Error fetching JSON:', error);
        });
}

function shuffleQuestions() {
    questions = shuffleArray(questions); // Randomize the order of questions
    currentQuestionIndex = 0; // Reset the current question index
}

// Shuffle the elements of an array using the Fisher-Yates algorithm
function shuffleArray(array) {
    var newArray = array.slice(); // Create a copy of the original array
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function loadQuestion(index) {
    var question = questions[index];
    var correctAnswer = question.correctAnswer;
    var explanation = question.explanation;
    var options = shuffleArray(question.options);

    questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = '';

    var questionElement = document.createElement('h2');
    questionElement.textContent = question.question;
    questionContainer.appendChild(questionElement);

    var optionsList = document.createElement('ul');
    optionsList.classList.add('options'); // Add the 'options' class to the <ul> element

    options.forEach(function (option) {
        var optionItem = document.createElement('li');
        optionItem.textContent = option;
        optionItem.addEventListener('click', function () {
            checkAnswer(optionItem, correctAnswer, explanation);
        });
        optionsList.appendChild(optionItem);
    });
    questionContainer.appendChild(optionsList);
}

function checkAnswer(selectedOption, correctAnswer, explanation) {
    var options = Array.from(selectedOption.parentNode.children);

    options.forEach(function (option) {
        option.removeEventListener('click', function () {});
        option.style.pointerEvents = 'none';

        if (option.textContent === correctAnswer) {
            option.classList.add('correct');
        } else if (option === selectedOption) {
            option.classList.add('incorrect');
        }
    });

    showExplanation(explanation);
}

// Show the explanation for the question
function showExplanation(explanation) {
    var explanationContainer = document.getElementById('explanation');
    explanationContainer.textContent = explanation;
}

// Clear the explanation
function clearExplanation() {
    var explanationContainer = document.getElementById('explanation');
    explanationContainer.textContent = '';
}

// Load the next question
function loadNextQuestion() {
    clearExplanation();
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion(currentQuestionIndex);
    } else {
        // Quiz completed
        nextButton.disabled = true;
        nextButton.textContent = 'All done';
        nextButton.style.backgroundColor = 'grey';
    }
}

// Initialize the quiz
initializeQuiz();

// Attach event listener to the Next Question button
nextButton = document.getElementById('next-button');
nextButton.addEventListener('click', loadNextQuestion);
