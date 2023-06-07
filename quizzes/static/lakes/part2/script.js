var currentQuestionIndex = 0;
var questions = [];
var states = [];
var questionContainer = null;
var correctscr= 0;
var incorrectscr= 0;
var totalQuestionsAttempted = 0;
var totalScore = 0;
var totalQuizzesAttempted = 0;

/* Navigation script*/

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Load JSON data and initialize the quiz
//CHANGE FILE NAME HERE
function initializeQuiz() {
  fetch('lake_pt2.json')
    .then(response => response.json())
    .then(data => {
      questions = data.questions;
      states = data.states;
      shuffleArray(questions); // Randomize the order of questions
      loadQuestion(currentQuestionIndex);
    })
    .catch(error => {
      console.log('Error fetching JSON:', error);
    });
}

// Shuffle the elements of an array using the Fisher-Yates algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function loadQuestion(index) {
  var question = questions[index];
  var correctAnswer = question.correctAnswer;
  var explanation = question.explanation;
  var options = getRandomOptions(correctAnswer, states, 5);

  questionContainer = document.getElementById('question-container');
  questionContainer.innerHTML = '';

  var questionNumber = index + 1; // Calculate the question number
  var questionElement = document.createElement('h2');
  questionElement.textContent = questionNumber + '. ' + question.question; // Display the question number
  questionElement.classList.add('question', 'question-size');
  questionContainer.appendChild(questionElement);

  var optionsList = document.createElement('ul');
  optionsList.classList.add('options'); // Add the 'options' class
  options.forEach(function (option) {
    var optionItem = document.createElement('li');
    optionItem.textContent = option;
    optionItem.addEventListener('click', function () {
      checkAnswer(optionItem, correctAnswer, explanation, currentQuestionIndex + 1);
    });

    optionsList.appendChild(optionItem);
  });
  questionContainer.appendChild(optionsList);

  // Create explanation container
  var explanationContainer = document.createElement('p');
  explanationContainer.id = 'explanation';
  explanationContainer.style.display = 'none';
  explanationContainer.innerHTML = explanation; // Set the explanation content

  // Create explanation toggle button
  var explanationButton = document.createElement('button');
  explanationButton.id = 'explanation-button'; // Add an ID to the button
  explanationButton.textContent = 'Explanation';
  explanationButton.classList.add('custom-button');

  explanationButton.addEventListener('click', function () {
    toggleExplanation(explanationContainer);
  });

  // Hide the explanation button
  explanationButton.style.visibility = 'hidden';
  // explanationButton.style.display = 'none';
  // explanationButton.style.display = 'block';

  // Append explanation container and button to question container
  questionContainer.appendChild(explanationButton);
  questionContainer.appendChild(explanationContainer);
}




function getRandomOptions(correctAnswer, allOptions, numOptions) {
  // Remove the correct answer from the options array
  var options = allOptions.filter(option => option !== correctAnswer);

  // Shuffle the options array
  shuffleArray(options);

  // Take the first (numOptions - 1) options
  var randomOptions = options.slice(0, numOptions - 1);

  // Add the correct answer at a random position
  var randomIndex = Math.floor(Math.random() * numOptions);
  randomOptions.splice(randomIndex, 0, correctAnswer);

  return randomOptions;
}

function checkAnswer(selectedOption, correctAnswer, explanation) {
  var options = Array.from(selectedOption.parentNode.children);

  options.forEach(function (option) {
    option.removeEventListener('click', function () { });
    option.style.pointerEvents = 'none';

    if (option.textContent === correctAnswer) {
      option.classList.add('correct');
      if (option === selectedOption) {
        correctscr++; // Increment score for correct answer
        displayScore(); // Update the correctscrdisplay

      }
    } else if (option === selectedOption) {
      option.classList.add('incorrect');
      incorrectscr++;  // Increment for incorrect answer
      displayScore();
    }
  });

  totalQuestionsAttempted++; // Increment totalQuestionsAttempted for each attempted question



  // Show the explanation button
  var explanationButton = document.getElementById('explanation-button');
  explanationButton.style.visibility = 'visible';
  // explanationButton.style.display = 'block';
}

function displayScore() {
  var correctScoreElement = document.getElementById('correctscore'); // Get the correctscore element
  correctScoreElement.textContent = correctscr; // Update the text content of correctscore element with the score

  var incorrectScoreElement = document.getElementById('incorrectscore'); // Get the incorrectscore element
  incorrectScoreElement.textContent = incorrectscr; // Update the text content of incorrectscore element with the score
}

// Toggle explanation visibility
function toggleExplanation(explanationContainer) {
  if (explanationContainer.style.display === 'block') {
    explanationContainer.style.display = 'none';
  } else {
    explanationContainer.style.display = 'block';
  }
}

// Clear the explanation
function clearExplanation() {
  var explanationContainer = document.getElementById('explanation');
  explanationContainer.style.display = 'none';
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
    // Hide the original button
    nextButton.style.display = 'none';

    // Create a new button element
    const refreshButton = document.createElement('button');
    refreshButton.textContent = 'Restart';
    refreshButton.style.backgroundColor = '#dd66ff';
    refreshButton.style.color = 'black';
    refreshButton.style.border = 'none';
    refreshButton.style.borderRadius = '5px';
    refreshButton.style.padding = '10px 20px';
    refreshButton.style.fontSize = '16px';
    refreshButton.style.cursor = 'pointer';
    refreshButton.style.fontWeight = 'bold';
    // Add an event listener to the new button to refresh the page
    refreshButton.addEventListener('click', function () {
      location.reload();
    });

    // Append the new button to the same container as the original button
    nextButton.parentNode.appendChild(refreshButton);


    // Calculate skipped questions
    var skippedQuestions = currentQuestionIndex - totalQuestionsAttempted;

    // Display score, attempted questions, and skipped questions
    var resultContainer = document.getElementById('result-container');
    resultContainer.innerHTML =
      '<span style="color: #00cc00;"> &#x2714; Correct: ' + correctscr +
      '</span> &nbsp; &nbsp; <span style="color:  #EC4D37;"> &#x2718; Incorrect: ' + (totalQuestionsAttempted - correctscr) +
      '</span> &nbsp; &nbsp; <span style="color: #DDC6B6;">➽ Skipped:' + skippedQuestions +'</span>';

  }
}


// Attach event listener to the Next Question button
document.addEventListener('DOMContentLoaded', function () {
  var nextButton = document.getElementById('next-button');
  nextButton.addEventListener('click', loadNextQuestion);
});


// Initialize the quiz
initializeQuiz();

// Attach event listener to the Next Question button
var nextButton = document.getElementById('next-button');
nextButton.addEventListener('click', loadNextQuestion);
