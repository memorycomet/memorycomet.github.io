let CORRECT_SCORE = 0.83;
let INCORRECT_SCORE = -0.27;
let numQuestions = 10;
let questions = [];

// Initialize Quiz
function initializeQuiz() {
    // Get configuration values
    numQuestions = parseInt(document.getElementById("numQuestions").value);
    CORRECT_SCORE = parseFloat(document.getElementById("correctMarks").value);
    INCORRECT_SCORE = parseFloat(document.getElementById("incorrectMarks").value);

    // Reset the state
    questions = Array(numQuestions).fill("unattempted");
    localStorage.setItem("questions", JSON.stringify(questions));
    localStorage.setItem(
        "config",
        JSON.stringify({ CORRECT_SCORE, INCORRECT_SCORE, numQuestions })
    );

    // Render the quiz
    renderQuiz();
    updateScore(); // Initialize score and summary
}

// Render Quiz Questions
function renderQuiz() {
    const questionsContainer = document.getElementById("questions");
    questionsContainer.innerHTML = ""; // Clear existing questions

    for (let i = 0; i < numQuestions; i++) {
        const questionDiv = document.createElement("div");
        questionDiv.className = "question";
        questionDiv.innerHTML = `
            <div>
               <div class="ques_headings">
                <label>Question ${i + 1}:</label>
               </div>
               <div class="options">
                <label>
                    <input type="radio" name="question-${i}" value="correct" 
                    onchange="updateScore(${i}, 'correct')">
                    <span class="correct">Correct</span>
                </label>
                <label>
                    <input type="radio" name="question-${i}" value="incorrect" 
                    onchange="updateScore(${i}, 'incorrect')">
                    <span class="incorrect">Incorrect</span>
                </label>
                <label>
                    <input type="radio" name="question-${i}" value="unattempted" 
                    onchange="updateScore(${i}, 'unattempted')" checked>
                    <span class="unattempted">Unattempted</span>
                </label>
                </div>
            </div>
        `;
        questionsContainer.appendChild(questionDiv);
    }

    document.getElementById("summary").style.display = "block";
    document.getElementById("actions").style.display = "block";
}

// Update Score and Summary
function updateScore(index = -1, value = "") {
    if (index >= 0) {
        questions[index] = value; // Update the question's state
        localStorage.setItem("questions", JSON.stringify(questions)); // Save state
    }

    let correct = 0, incorrect = 0, unattempted = 0, score = 0;

    questions.forEach((response) => {
        if (response === "correct") {
            correct++;
            score += CORRECT_SCORE;
        } else if (response === "incorrect") {
            incorrect++;
            score += INCORRECT_SCORE;
        } else {
            unattempted++;
        }
    });

    // Update the summary
    document.getElementById("correct").textContent = correct;
    document.getElementById("incorrect").textContent = incorrect;
    document.getElementById("unattempted").textContent = unattempted;
    document.getElementById("attempted").textContent = correct + incorrect;
    document.getElementById("score").textContent = score.toFixed(2);
}

// Clear Data
function clearData() {
    localStorage.removeItem("questions");
    localStorage.removeItem("config");
    questions = Array(numQuestions).fill("unattempted");
    location.reload();
}

// Restore State on Page Load
function restoreState() {
    const savedConfig = JSON.parse(localStorage.getItem("config"));
    if (savedConfig) {
        CORRECT_SCORE = savedConfig.CORRECT_SCORE;
        INCORRECT_SCORE = savedConfig.INCORRECT_SCORE;
        numQuestions = savedConfig.numQuestions;

        document.getElementById("numQuestions").value = numQuestions;
        document.getElementById("correctMarks").value = CORRECT_SCORE;
        document.getElementById("incorrectMarks").value = INCORRECT_SCORE;
    }

    questions = JSON.parse(localStorage.getItem("questions")) || Array(numQuestions).fill("unattempted");

    renderQuiz();

    // Restore the selected options
    questions.forEach((response, index) => {
        const radios = document.getElementsByName(`question-${index}`);
        radios.forEach((radio) => {
            if (radio.value === response) {
                radio.checked = true;
            }
        });
    });

    updateScore(); // Update the summary with restored state
}

// Restore state when the page loads
document.addEventListener("DOMContentLoaded", restoreState);



