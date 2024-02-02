document.addEventListener("DOMContentLoaded", function () {
    const cells = document.querySelectorAll(".cell");
    const questionDisplay = document.querySelector(".question-display");
    const questionText = document.querySelector(".question-modal p");
    const answerInput = document.querySelector(".question-modal input");
    const submitButton = document.querySelector(".question-modal button");
    const scoreDisplay = document.getElementById("score");
    const popupDisplay = document.getElementById("popupDisplay");

    let currentCell;
    let score = 0;
    let answeredQuestions = 0;

    cells.forEach((cell) => {
        cell.addEventListener("click", () => {
            currentCell = cell;
            const question = cell.dataset.question || "No question available";
            const answer = cell.dataset.answer || "";
            showQuestionModal(question, answer);
        });
    });

    submitButton.addEventListener("click", () => {
        const userAnswer = answerInput.value;
        const correctAnswer = currentCell.dataset.answer;

        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            showAlert("Correct! You earned " + currentCell.querySelector(".front").textContent + " points.", "correct");
            score += parseInt(currentCell.querySelector(".front").textContent);
            updateScore();
            clearCell(currentCell);
            answeredQuestions++;

            if (answeredQuestions === cells.length) {
                showAlert("Game completed! Your final score is: " + score, "correct");
                resetGame();
            }
        } else {
            showAlert("Incorrect! Deducting 100 points.", "incorrect");
            
            score -= 100;
            updateScore();
        }

        hideQuestionModal();
    });

    function showQuestionModal(question, answer) {
        questionText.textContent = question;
        answerInput.value = ""; 
        questionDisplay.style.display = "block";
    }

    function hideQuestionModal() {
        questionDisplay.style.display = "none";
    }

    function clearCell(cell) {
       
        cell.querySelector(".front").textContent = "";
        cell.querySelector(".back").textContent = "";
    }

    function updateScore() {
        scoreDisplay.textContent = score;
    }

    function resetGame() {
    
        score = 0;
        answeredQuestions = 0;
        updateScore();
    }

    function showAlert(message, type) {
        popupDisplay.textContent = message;
        popupDisplay.className = "popup-display " + type;
        popupDisplay.style.display = "block";

        
        setTimeout(() => {
            popupDisplay.style.display = "none";
        }, 4000);
    }
});
