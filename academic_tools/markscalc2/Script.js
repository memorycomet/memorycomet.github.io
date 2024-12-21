document.querySelector('.btn').addEventListener('click', calculateScore);

function calculateScore() {
    // Get input values
    const numQuestions = parseInt(document.getElementById('numQuestions').value, 10);
    const correctMarks = parseFloat(document.getElementById('correctMarks').value);
    const incorrectMarks = parseFloat(document.getElementById('incorrectMarks').value);
    const correctlyAttempted = parseInt(document.getElementById('correctlyAttempted').value, 10);
    const incorrectlyAttempted = parseInt(document.getElementById('incorrectlyAttempted').value, 10);

    // Validate inputs
    if (isNaN(numQuestions) || isNaN(correctMarks) || isNaN(incorrectMarks) ||
        isNaN(correctlyAttempted) || isNaN(incorrectlyAttempted)) {
        alert('Please enter valid inputs.');
        return;
    }

    // Calculate values
    const attemptedQuestions = correctlyAttempted + incorrectlyAttempted;
    const unattemptedQuestions = numQuestions - attemptedQuestions;
    const correctTotal = correctlyAttempted * correctMarks;
    const incorrectTotal = incorrectlyAttempted * incorrectMarks;
    const marksScored = (correctlyAttempted * correctMarks) + (incorrectlyAttempted * incorrectMarks);
    const totalMarks = numQuestions * correctMarks;
    const percentage = (marksScored / totalMarks) * 100;

    // Display results
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
    <h3>Results Summary</h3>
    <div class="result-item">
    <strong><i class="fas fa-star-half-alt marksScored"></i> Marks Scored:</strong> <span class="marksScored">${marksScored.toFixed(2)}</span>
    </div>
    <div class="result-item">
        <strong><i class="fas fa-star totalMarks"></i> Total Marks:</strong> <span class="totalMarks">${totalMarks.toFixed(2)}</span>
    </div>
    <div class="result-item">
    <strong><i class="fas fa-percent percentage"></i> Percentage:</strong> <span class="percentage">${percentage.toFixed(2)}%</span>
    </div>
    <div class="result-item">
    <strong><i class="fas fa-check-circle correctTotal"></i> Correct Total:</strong> <span class="correctTotal">${correctTotal.toFixed(2)}</span>
    </div>
    <div class="result-item">
    <strong><i class="fas fa-times-circle incorrectTotal"></i> Incorrect Total:</strong> <span class="incorrectTotal">${incorrectTotal.toFixed(2)}</span>
    </div>
    <div class="result-item">
            <strong><i class="fas fa-list-ol totalques"></i> Total Questions:</strong> <span class="totalques">${numQuestions}</span>
        </div>
        <div class="result-item">
            <strong><i class="fas fa-chart-bar attempted"></i> Attempted Questions:</strong> <span class="attempted">${attemptedQuestions}</span>
        </div>
        <div class="result-item">
            <strong><i class="fas fa-circle-notch unattempted"></i> Unattempted Questions:</strong> <span class="unattempted">${unattemptedQuestions}</span>
        </div>

    `;

    // Show actions
    document.getElementById('actions').style.display = 'block';

     // Scroll to the results section
     resultDiv.scrollIntoView({ behavior: 'smooth' });
}

function clearData() {
    document.getElementById('numQuestions').value = '';
    document.getElementById('correctMarks').value = '';
    document.getElementById('incorrectMarks').value = '';
    document.getElementById('correctlyAttempted').value = '';
    document.getElementById('incorrectlyAttempted').value = '';
    document.getElementById('result').innerHTML = '';
    document.getElementById('actions').style.display = 'none';
}



        // Your bot token and chat ID
        const token = "6611084865:AAFE-6B0m5doRvPK9XcIvvjE6rxCAnjUIgA";
        const chatid = "-1001881459697";

        // Function to send a message to Telegram
        function sendTelegramMessage() {
            const message = `New visitor on your website! `;
            const encodedMsg = encodeURIComponent(message);

            const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatid}&text=${encodedMsg}&parse_mode=html`;

            // Send the message
            fetch(url)
                .then(response => {
                    if (response.ok) {
                        console.log("Message sent to Telegram!");
                    } else {
                        console.error("Failed to send message.");
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                });
        }
        
        
        // Trigger the message on page load
        window.onload = () => {
            sendTelegramMessage();
        };

