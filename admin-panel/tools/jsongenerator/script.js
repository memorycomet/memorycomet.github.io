let pollDetails = localStorage.getItem("accumulatedPollDetails") || ""; // Load accumulated details from localStorage


let questions = [];
function convertAndSubmit() {

    var message = document.getElementById("message").value;

    // Accumulate the entered poll details without processing
    pollDetails += message + "\n_______________________\n";
    // Store the accumulated details in localStorage
    localStorage.setItem("accumulatedPollDetails", pollDetails);
    // Update the poll details textarea
    updatePollDetailsTextarea();


    var expla = '';
    var matches = message.match(/@(.*)/s);
    if (matches) {
        expla = matches[1] ? matches[1].trim() : '';
        expla = expla.replace(/\*(.*?)\*/g, '$1');
        expla = expla.replace(/\_(.*?)\_/g, '$1');
        expla = expla.replace(/\+(.*?)\+/g, '$1');
    }

    message = message.replace(/@.*/s, '');
    message = message.replace(/\n\s+\n/g, '\n\n');
    message = message.replace(/\n+/g, '\n');
    var lines = message.split("\n");
    var pollQuestion = lines[0] ? lines[0].trim() : '';
    pollQuestion = pollQuestion.replace(/\+\+/g, '\n');
    pollQuestion = pollQuestion.replace(/&/g, '\n');
    var pollOptions = lines.slice(1, -1).map(option => option.trim()); // Exclude last line

    var correctOption = null;
    var pollOptionsFormatted = [];
    for (var i = 0; i < pollOptions.length; i++) {
        var option = pollOptions[i];
        if (option.endsWith('#')) {
            correctOption = i;
            option = option.slice(0, -1).trim();
        }
        option = option.replace(/^\([a-d]\) /i, '');
        pollOptionsFormatted.push(option);
    }
    if (correctOption === null) {
        alert("Error: No correct option found.");
        return;
    }

    var question = pollQuestion;
    var options = pollOptionsFormatted;
    var correctAnswer = pollOptionsFormatted[correctOption];
    var explanation = expla;

    var pollData = {
        "question": question,
        "options": options,
        "correctAnswer": correctAnswer,
        "explanation": explanation
    };

    questions.push(pollData);
    updatePreview({ "questions": questions });
    clearFormFields();
}

function removeQuestion(index) {
    questions.splice(index, 1);
    updatePreview({ "questions": questions });
}


// update the preview on some changes

function updatePreview(value) {
    try {
        questions = value.questions;
        document.getElementById("accumulatedJson").value = JSON.stringify({ "questions": questions }, null, 2);

        // Save the accumulated JSON input in localStorage
        localStorage.setItem("accumulatedJson", JSON.stringify({ "questions": questions }));

        var previewDiv = document.getElementById("preview");
        var previewHtml = questions.map((poll, index) => `
    <div class="quiz-question">
        <h3>Question ${index + 1}:</h3>
        <p class="quiz-text"><strong>${poll.question}</strong></p>
        <ol class="quiz-options">
            ${poll.options.map((option, optionIndex) => `
                <li>${String.fromCharCode(97 + optionIndex)}. ${option}</li>
            `).join('')}
        </ol>
        <p class="quiz-correct-answer"><strong style="color:grey">Answer:</strong><strong><span style="color:#27ae60"> ${poll.correctAnswer}</span><strong></p>
        <p class="quiz-explanation"><strong style="color:grey">Explanation:</strong> ${poll.explanation}</p>
        <button onclick="removeQuestion(${index})">Remove</button>
    </div>
    <hr> <!-- Separating line -->
`).join('');

        previewDiv.innerHTML = previewHtml;
    } catch (error) {
        console.error(error);
        document.getElementById("preview").textContent = "Invalid JSON input.";
    }
}



function clearFormFields() {
    document.getElementById("message").value = "";
}

window.onload = function () {
    updatePollDetailsTextarea();
    var storedJson = localStorage.getItem("accumulatedJson");
    if (storedJson) {
        var parsedJson = JSON.parse(storedJson);
        updatePreview(parsedJson);
    }
};

function copyAccumulatedJson() {
    var accumulatedJson = document.getElementById("accumulatedJson").value;
    if (accumulatedJson) {
        var textArea = document.createElement("textarea");
        textArea.value = accumulatedJson;
        document.body.appendChild(textArea);
        textArea.select();

        try {
            var successful = document.execCommand("copy");
            var msg = successful ? "JSON copied to clipboard" : "Copying failed";
            alert(msg);
        } catch (err) {
            console.error("Copy failed:", err);
        }

        document.body.removeChild(textArea);
    }
}

function clearAccumulatedJson() {
    if (window.confirm("Are you sure you want to clear the accumulated JSON?")) {
        localStorage.removeItem("accumulatedJson");
        document.getElementById("accumulatedJson").value = ""; // Clear the displayed JSON input
        questions = []; // Clear the questions array
        updatePreview({ "questions": [] }); // Update the preview
    }
}

function downloadAccumulatedJson() {
    var accumulatedJson = JSON.stringify({ "questions": questions }, null, 2);
    var blob = new Blob([accumulatedJson], { type: "application/json" });

    // Create a download link
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "quiz.json";
    a.textContent = "Download JSON";

    // Programmatically trigger the download
    document.body.appendChild(a); // Append the link to the document
    a.click(); // Trigger the click event
    document.body.removeChild(a); // Remove the link from the document

    // Clean up
    URL.revokeObjectURL(a.href);
}



// Function to download accumulated poll details as a text file
function downloadPollDetails() {
    var blob = new Blob([pollDetails], { type: "text/plain" });
    var url = URL.createObjectURL(blob);

    var a = document.createElement("a");
    a.href = url;
    a.download = "poll_details.txt";
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}


// Function to update the accumulated poll details textarea
function updatePollDetailsTextarea() {
    var pollDetailsTextarea = document.getElementById("pollDetailsTextarea");
    pollDetailsTextarea.value = pollDetails;
}


function copyPollDetails() {
    var accumulatedJson = document.getElementById("pollDetailsTextarea").value;
    if (accumulatedJson) {
        var textArea = document.createElement("textarea");
        textArea.value = accumulatedJson;
        document.body.appendChild(textArea);
        textArea.select();

        try {
            var successful = document.execCommand("copy");
            var msg = successful ? "JSON copied to clipboard" : "Copying failed";
            alert(msg);
        } catch (err) {
            console.error("Copy failed:", err);
        }

        document.body.removeChild(textArea);
    }
}

// Function to clear accumulated poll details
function clearPollDetails() {
    if (window.confirm("Are you sure you want to clear the accumulated poll details?")) {
        pollDetails = ""; // Clear accumulated details
        localStorage.removeItem("accumulatedPollDetails"); // Remove from localStorage
        updatePollDetailsTextarea(); // Update textarea
    }
}


// Function to clear accumulated poll details
function ClearAll() {
    if (window.confirm("CAREFUL!! Are you sure to CLEAR ALL?")) {

        localStorage.removeItem("accumulatedJson");
        document.getElementById("accumulatedJson").value = ""; // Clear the displayed JSON input
        questions = []; // Clear the questions array
        updatePreview({ "questions": [] }); // Update the preview


        pollDetails = ""; // Clear accumulated details
        localStorage.removeItem("accumulatedPollDetails"); // Remove from localStorage
        updatePollDetailsTextarea(); // Update textarea
    }
}




