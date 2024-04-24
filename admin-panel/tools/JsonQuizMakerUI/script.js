let pollDetails = localStorage.getItem("accumulatedPollDetails") || ""; // Load accumulated details from localStorage


let questions = [];
function convertAndSubmit() {
    const question = document.getElementById("question").value.trim();
    const optionA = document.getElementById("optionA").value.trim();
    const optionB = document.getElementById("optionB").value.trim();
    const optionC = document.getElementById("optionC").value.trim();
    const optionD = document.getElementById("optionD").value.trim();
    const correctOption = document.querySelector('input[name="correctOption"]:checked');
    const explanation = document.getElementById("explanation").value.trim();

    if (!question || !optionA || !optionB || !optionC || !optionD || !correctOption) {
        alert("Please fill in all fields and select the correct option.");
        return;
    }

    if (question.length > 300) {
        alert("Question length should not exceed 300 characters.");
        return;
    }

    const options = [optionA, optionB, optionC, optionD];
    const correctOptionIndex = parseInt(correctOption.value, 10);

    // Check character limits for options
    for (const option of options) {
        if (option.length > 100) {
            alert("Option length should not exceed 100 characters.");
            return;
        }
    }

    // Check character limit for explanation
    if (explanation && explanation.length > 200) {
        alert("Explanation length should not exceed 200 characters.");
        return;
    }

    const pollData = {
        "question": question,
        "options": options,
        "correctAnswer": options[correctOptionIndex],
        "explanation": explanation || null
    };


    // Append the new poll details to the "accumulated poll details" textarea
    const accumulatedPollDetailsTextarea = document.getElementById("pollDetailsTextarea");
    accumulatedPollDetailsTextarea.value += `${question}\n\n${options.join('\n')}\nCorrect Answer: ${options[correctOptionIndex]}\nExplanation: ${explanation || 'No explanation provided'}\n_______________________\n`;

    // Save the updated accumulated poll details in local storage
    localStorage.setItem("pollDetailsTextarea", pollDetailsTextarea.value);


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

        if (questions.length > 0) {
            var previewHtml = questions.map((poll, index) => `
        <div class="quiz-question">
            <h3 class="quiz-question-title">Question ${index + 1}:</h3>
            <p class="quiz-text"><strong>${poll.question}</strong></p>
            <ol class="quiz-options">
                ${poll.options.map((option, optionIndex) => `
                    <li>${String.fromCharCode(97 + optionIndex)}. ${option}</li>
                `).join('')}
            </ol>
            <p class="quiz-correct-answer"><strong class="correct-answer-label">Answer:</strong><strong class="correct-answer">${poll.correctAnswer}</strong></p>
            <p class="quiz-explanation"><strong class="explanation-label">Explanation:</strong> ${poll.explanation !== null && poll.explanation !== undefined ? poll.explanation : '<i class="no-explanation">No explanation provided </i>'}</p>
            <button class="remove-button" onclick="removeQuestion(${index})">Remove</button>
        </div>
    `).join('');

            previewDiv.innerHTML = previewHtml;
            previewDiv.style.display = 'block'; // Show the preview
        } else {
            previewDiv.innerHTML = ''; // Clear the preview
            previewDiv.style.display = 'none'; // Hide the preview
        }
    } catch (error) {
        console.error(error);
        document.getElementById("preview").textContent = "Invalid JSON input.";
    }
}



function clearFormFields() {
    document.getElementById("question").value = "";
    document.getElementById("optionA").value = "";
    document.getElementById("optionB").value = "";
    document.getElementById("optionC").value = "";
    document.getElementById("optionD").value = "";
    document.getElementById("explanation").value = "";
    document.querySelector('input[name="correctOption"]:checked').checked = false;
    localStorage.removeItem('formData');
}




window.onload = function () {
    updatePollDetailsTextarea();
    var storedpollDetailsTextarea = localStorage.getItem("pollDetailsTextarea");
    if (storedpollDetailsTextarea) {
        document.getElementById("pollDetailsTextarea").value = storedpollDetailsTextarea;
    }
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
        localStorage.removeItem("pollDetailsTextarea");
        document.getElementById("pollDetailsTextarea").value = ""; // Clear the displayed JSON input
        questions = []; // Clear the questions array
        updatePreview({ "questions": [] }); // Update the preview

        document.getElementById("status").innerHTML = "";
        pollDetails = ""; // Clear accumulated details
        localStorage.removeItem("accumulatedPollDetails"); // Remove from localStorage
        updatePollDetailsTextarea(); // Update textarea
    }
}


// Function to display status messages
function displayStatus(message) {
    const statusElement = document.getElementById('status');
    statusElement.textContent = message;
}



async function uploadQuestions() {
    if (questions.length === 0) {
        displayStatus('No questions available to upload.');
        return;
    }

    if (window.confirm('Are you sure you want to upload the questions to Telegram?')) {
        try {
            displayStatus('Uploading quiz to Telegram...'); // Display status message

            for (const questionData of questions) {
                await sendTelegramPoll(questionData);
            }

            displayStatus('Questions sent to Telegram successfully ✔'); // Display status message
        } catch (error) {
            console.error('Error sending questions:', error);
            displayStatus('Error sending questions. Please try again.'); // Display status message
        }
    }
}

async function sendTelegramPoll(questionData) {
    const apiUrl = 'https://api.telegram.org/bot6317396840:AAHyX7uFzS1NBtOJlV3MfqlHAzr0YRBDg5g/sendPoll';
    const chatId = '@tryphpbott'; // Replace with your Telegram chat ID

    // Map options to string array
    const options = questionData.options;

    const correctOptionIndex = questionData.options.indexOf(questionData.correctAnswer);

    if (correctOptionIndex === -1) {
        console.error('No correct option found for question:', questionData.question);
        throw new Error('No correct option found');
    }

    const pollData = {
        chat_id: chatId,
        question: questionData.question,
        options: JSON.stringify(options),
        is_anonymous: true,
        type: 'quiz',
        correct_option_id: correctOptionIndex,
    };

    // Include explanation if available and not null
    if (questionData.explanation !== null && questionData.explanation !== undefined) {
        pollData.explanation = questionData.explanation;
    }


    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pollData)
        });

        const responseData = await response.json();

        if (!responseData.ok) {
            throw new Error(responseData.description || 'Failed to send poll to Telegram.');
        }
    } catch (error) {
        console.error('Error sending poll to Telegram:', error);
        throw error;
    }
}
