document.getElementById('examSelect').addEventListener('change', updateExamDetails);


function updateExamDetails() {
    const examSelect = document.getElementById('examSelect');
    const examValue = examSelect.value;

    let numQuestions = 0;
    let correctMarks = 0;
    let incorrectMarks = 0;

    // Define details for each exam
    switch (examValue) {
        case 'CDS':
            numQuestions = 120;
            correctMarks = 0.83;
            incorrectMarks = -0.27 ;
            break;
        case 'NDAmaths':
            numQuestions = 120;
            correctMarks = 2.5;
            incorrectMarks = -0.83;
            break;
        case 'NDAgat':
            numQuestions = 150;
            correctMarks = 4.0;
            incorrectMarks = -1.33;
            break;
        case 'UPSC_gs1':
            numQuestions = 200;
            correctMarks = 2.0;
            incorrectMarks = -0.67;
            break;
        case 'UPSC_CSAT':
            numQuestions = 80;
            correctMarks = 2.5;
            incorrectMarks = -0.83;
            break;
        case 'CUET':
            numQuestions = 250;
            correctMarks = 5;
            incorrectMarks = -1.0;
            break;
        case 'other':
            numQuestions = null;
            correctMarks = null;
            incorrectMarks = null;
            break;
        default:
     // Reset values when no exam is selected
            numQuestions = 120;
            correctMarks = 0.83;
            incorrectMarks = -0.27;
            break;
    }

    // Update the input fields
    document.getElementById('numQuestions').value = numQuestions;
    document.getElementById('correctMarks').value = correctMarks;
    document.getElementById('incorrectMarks').value = incorrectMarks;
}