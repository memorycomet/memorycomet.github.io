// Declare a variable to store the generated numbers globally
let numbers;
var crt = 0;
var incrt = 0; 
var totalSeconds = 0;
var timerVariable;
var score = 0;

//Check the correct answer
function checkSum() {
	
   if (!timerVariable) {
    start_time(); // Start the timer if it's not already started
}
    var userAnswer = parseInt(document.getElementById("ans_box").value);
    var sum = numbers[0] + numbers[1];
    
    if (userAnswer === sum) {
        // Correct answer logic
      display = numbers[0] + " + " + numbers[1] + " = " + sum;
      document.getElementById("Ans_review").innerHTML = display; 
      correct_table(display);
      document.getElementById("Ans_review").style.background = "#04D55A";
        crt = crt + 1;
        score += 10;
    } else {
        // Incorrect answer logic
      display = numbers[0] + " + " + numbers[1] + " = " + sum;
      document.getElementById("Ans_review").innerHTML = display; 
      incorrect_table(display);
     document.getElementById("Ans_review").style.background = "#F4474D";
         incrt = incrt + 1;
         score -= 5; 
    }

   document.getElementById("score").innerHTML = score; // Update live score
    startGame(); // Start the next round
}




// Add a variable to store the current digit length
let digitLength = 2;

// Function to update the digit length based on user selection
function updateDigitLength() {
    digitLength = parseInt(document.getElementById("digitLengthSelector").value);
    restartGame();
}

// Function to generate a random number with the specified digit length
function randomNDigit(n) {
    const min = Math.pow(10, n - 1);
    const max = Math.pow(10, n) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate the numbers
function generateNumbers() {
    var num1 = randomNDigit(digitLength);
    var num2 = randomNDigit(digitLength);
    return [num1, num2]; 
    // Return an array of two random numbers
}

 
/*MAIN FUNCTION */
function startGame() {
    document.getElementById('ans_box').value = '';
    	console.log("Game started!!");
        numbers = generateNumbers();
        document.getElementById("ques_box").value = numbers[0] + " + " + numbers[1];
// Display the random numbers
 }
 
 // Add an endGame function to handle game end logic
function endGame() {
    // For example, disable the answer box and show a message
    document.getElementById("ans_box").disabled = true;
    document.getElementById("entr_btn").disabled = true;
    document.getElementById("skip_btn").disabled = true;
   document.getElementById("ques_box").value = "Done!!";
    document.getElementById("Ans_review").innerHTML = "Time's up!";
    document.getElementById("Ans_review").style.background = "#F4474D";
    // Update and check highscore
    updateHighScore();
    showGameStatistics();
}

// Function to update and check highscore at the end of the game
function updateHighScore() {
    // Retrieve the highscore from localStorage
    let highscore = parseInt(localStorage.getItem('highscore')) || 0;

    // Check if the current score is greater than the highscore
    if (score > highscore) {
        // Update the highscore in localStorage
        localStorage.setItem('highscore', score);

        // Notify the user
        document.getElementById("highscoreMessage").innerHTML = "Congrats 🎉! You've set a new high score!";
    } else {
        // If not a high score, you can also display a message or do nothing
        document.getElementById("highscoreMessage").innerHTML = "Try again to beat the Highscore: " + highscore;
    }
}

// Display Game Statistics After Game
function showGameStatistics() {
    var totalQuestions = crt + incrt; 
    var correctAnswers = crt;
  // Correct answer scores 10 points
    
    // Calculate accuracy percentage
    var accuracyPercentage = (correctAnswers / totalQuestions) * 100;
  // Calculate the number of stars based on accuracy percentage
    var numStars = Math.floor(accuracyPercentage / 20);
    
    // Display the statistics
    document.getElementById("total_questions").innerHTML = '<i class="fa-solid fa-bullseye"></i>' + " Total Questions: " + totalQuestions;
    document.getElementById("correct_answers").innerHTML = '<i class="fa-solid fa-bullseye"></i>' +" Correctly Answered: " + correctAnswers;
   document.getElementById("accuracy_percentage").innerHTML = '<i class="fa-solid fa-bullseye"></i>' + " Accuracy: " + accuracyPercentage.toFixed(2) + "%";
    // Show stars based on accuracy
    var stars = "";
    for (var i = 0; i < 5; i++) {
        if (i < numStars) {
            stars += "🌟"; // Full star
        } else {
            stars += '<i class="fa-regular fa-star"></i>'; // Empty star
        }
    }
    document.getElementById("stars").innerHTML = stars;

}


// Function to clear the Score after restart
function clearScore() {
	document.getElementById("total_questions").innerHTML = "";
	document.getElementById("correct_answers").innerHTML = "";
	document.getElementById("score").innerHTML = "00";
	document.getElementById("accuracy_percentage").innerHTML = "";
	document.getElementById("stars").innerHTML = "";
	document.getElementById("highscoreMessage").innerHTML = "";
	totalSeconds = 0; // Reset the total seconds
    timerVariable = null; //
    crt = 0;
    incrt=0;
    score=0;
	}
	
function clearHighScore(){
    // Clear the highscore from localStorage
    localStorage.removeItem('highscore');

    // Optionally, update the UI to reflect the highscore has been cleared
alert("Highscore has been cleared");

    // If you display the highscore somewhere else in your UI, you might want to update that as well
    // For example, if you have an element showing the highscore, you could do:
    // document.getElementById("displayHighScore").innerHTML = "Highscore: 0";
}



// Function to restart the game
function restartGame() {
    clearInterval(timerVariable); // Stop the timer if it's running
    clearScore();
   document.getElementById("Ans_review").innerHTML = "Ready!! ";
  document.getElementById("Ans_review").style.background = "#CC99FF";
  document.getElementById("entr_btn").disabled = false;
  document.getElementById("skip_btn").disabled = false;
    totalSeconds = 0; // Reset the total seconds
   timerVariable = null; // Set timerVariable to null  
    document.getElementById("count_up_timer").innerHTML = "02:00"; // Reset the timer display
   document.getElementById("crt_tbody").innerHTML = ""; //Clear correct table 
   document.getElementById("wrg_tbody").innerHTML = ""; //Clear incorrect table 

    startGame(); // Start a new game round
}


    
    
    
// Code For Timerrrr 🕒 🕒 🕒 🕒 
function start_time() {
//Initiating variable to increase seconds 
totalSeconds = 120; // Start from 3 minutes
  timerVariable = setInterval(countDownTimer, 1000);
    }    
    
 // pad function is to add 0 before digit if it is less than 9 
function pad(value) { return value > 9 ? value : "0" + value; }
    
    
function countDownTimer() {
    --totalSeconds;
    if (totalSeconds >= 0) {
        var minute = pad(Math.floor(totalSeconds / 60));
        var seconds = pad(totalSeconds % 60);

        // Updating the timer display with the countdown
        document.getElementById("count_up_timer").innerHTML = minute + ":" + seconds;
    } else {
        // When the countdown reaches zero
        clearInterval(timerVariable); // Stop the timer
        endGame(); // Call a function to handle the end of the game, like disabling inputs or showing a message
    }
}
/* Code for timerrrr finished🕒 🕒 🕒  */

    
    
    
 /*Function to show text user typing */
function typeTxt(x) {
        var t = document.getElementById("ans_box").value;
        var c = t + x;
        document.getElementById("ans_box").value = c;
}
    /*Delete last word by backspace */
    function backspc() {
        var str = document.getElementById("ans_box").value;
        var res = str.substring(0, str.length - 1);
        document.getElementById("ans_box").value = res;
    }
  
  
  
  
      /*These two functions are solely responsible to add digit to table at the end*/
    function correct_table(text) {
        var tableRef = document.getElementById('myTable1').getElementsByTagName('tbody')[0];
        // Insert a row in the table at row index 0

        var newRow = tableRef.insertRow(tableRef.rows.length);
        // Insert a cell in the row at index 0
        var newCell = newRow.insertCell(0);
        // Append a text node to the cell

        var newText = document.createTextNode(text)
        var aftertxt = document.createTextNode(text)
        newCell.appendChild(newText);
    }

    function incorrect_table(text) {
        var tableRef = document.getElementById('myTable2').getElementsByTagName('tbody')[0];
        // Insert a row in the table at row index 0

        var newRow = tableRef.insertRow(tableRef.rows.length);
        // Insert a cell in the row at index 0
        var newCell = newRow.insertCell(0);
        // Append a text node to the cell

        var newText = document.createTextNode(text)
        var aftertxt = document.createTextNode(text)
        newCell.appendChild(newText);
    }