document.addEventListener('DOMContentLoaded', () => {
    const ball = document.getElementById('ball');
    const leftBox = document.querySelector('.leftbox');
    const middleBox = document.querySelector('.middlebox');
    const rightBox = document.querySelector('.rightbox');
    const scoreboard = document.getElementById('scoreboard');

    let positionIndex = 2; // Initially placed in the middle position box
    let score = 0; // Initial user score
    let oppScore = 0; // Initial opponent score

    // Event listeners for position boxes
    leftBox.addEventListener('click', () => {
        positionIndex = 1;
        moveBall();
    });

    middleBox.addEventListener('click', () => {
        positionIndex = 2;
        moveBall();
    });

    rightBox.addEventListener('click', () => {
        positionIndex = 3;
        moveBall();
    });

    // Function to move the ball to the specified position box
    const moveBall = () => {
        let targetBox;
        if (positionIndex === 1) {
            targetBox = leftBox;
        } else if (positionIndex === 2) {
            targetBox = middleBox;
        } else if (positionIndex === 3) {
            targetBox = rightBox;
        }

        const targetPosition = targetBox.getBoundingClientRect();
        const boxWidth = targetPosition.width;
        const ballWidth = ball.offsetWidth;
        const offsetX = (boxWidth - ballWidth) / 2;

        ball.style.left = `${targetPosition.left + offsetX}px`;
        ball.style.top = `${targetPosition.top}px`;
    };

    // Move the ball to the initial position
    moveBall();

    // Initialize the scoreboard
    scoreboard.textContent = `You ${score} - ${oppScore} Opponent`;

    // Event listener for left and right arrow keys
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft' && positionIndex > 1) {
            positionIndex--;
            moveBall();
        } else if (event.key === 'ArrowRight' && positionIndex < 3) {
            positionIndex++;
            moveBall();
        }
        if (event.key === "Enter") {
            // Generate a random position for the opponent
            let opponentPosition = Math.floor(Math.random() * 3) + 1;
            handleGameResult(opponentPosition);
            // Reset the opponent position for the next game
            opponentPosition = null;
        }
    });

    // Function to handle the game result
    const handleGameResult = (opponentPosition) => {
        if (opponentPosition === positionIndex) {
            alert("You lose!");
            oppScore++; // Increment the opponent score if the game wins
        } else {
            alert("You win!");
            score++; // Increment the user score if they win
        }
        // Update the scoreboard
        scoreboard.textContent = `You ${score} - ${oppScore} Opponent`;
    };
});
