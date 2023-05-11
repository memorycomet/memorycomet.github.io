var currentQuestionIndex = 0;
var questions = [];
var states = [];
var questionContainer = null;


// Load JSON data and initialize the quiz
function initializeQuiz() {
    fetch('nationalparks.json')
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
  
    var questionElement = document.createElement('h2');
    questionElement.textContent = question.question;
    questionElement.classList.add('question', 'question-size');
    questionContainer.appendChild(questionElement);
  
    var optionsList = document.createElement('ul');
    optionsList.classList.add('options'); // Add the 'options' class
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
      option.removeEventListener('click', function() {});
      option.style.pointerEvents = 'none';
  
      if (option.textContent === correctAnswer) {
        option.classList.add('correct');
      } else if (option === selectedOption) {
        option.classList.add('incorrect');
      }
    });
  
    showExplanation(explanation);
  }
function highlightCorrectOption(correctAnswer, options) {
    for (var i = 0; i < options.length; i++) {
        var option = options[i];
        if (option.textContent === correctAnswer) {
            option.classList.add('correct');
            break;
        }
    }
}

  


// Show the explanation for the question
function showExplanation(explanation) {
    var explanationContainer = document.getElementById('explanation');
    explanationContainer.textContent = explanation;
}

// Highlight the correct option if the answer is incorrect
function highlightCorrectOption(correctAnswer, options) {
    for (var i = 0; i < options.length; i++) {
        var option = options[i];
        if (option.textContent === correctAnswer) {
            option.classList.add('correct');
            break;
        }
    }
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
var nextButton = document.getElementById('next-button');
nextButton.addEventListener('click', loadNextQuestion);
