document.addEventListener('DOMContentLoaded', () => {
    const glove = document.getElementById('glove');
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
        moveglove();
    });

    middleBox.addEventListener('click', () => {
        positionIndex = 2;
        moveglove();
    });

    rightBox.addEventListener('click', () => {
        positionIndex = 3;
        moveglove();
    });

    // Function to move the glove to the specified position box
    const moveglove = () => {
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
        const gloveWidth = glove.offsetWidth;
        const offsetX = (boxWidth - gloveWidth) / 2;

        glove.style.left = `${targetPosition.left + offsetX}px`;
        glove.style.top = `${targetPosition.top}px`;
    };

    // Move the glove to the initial position
    moveglove();

    // Initialize the scoreboard
    scoreboard.textContent = `You ${score} - ${oppScore} Opponent`;

    // Event listener for left and right arrow keys
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft' && positionIndex > 1) {
            positionIndex--;
            moveglove();
        } else if (event.key === 'ArrowRight' && positionIndex < 3) {
            positionIndex++;
            moveglove();
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
        if (opponentPosition != positionIndex) {
            alert("You lose!");
            oppScore++; // Increment the opponent score if the game wins
        } else {
            alert("You win!");
            score++; // Increment the user score if they win
        }
        // Update the scoreboard
        scoreboard.textContent = `You ${score} - ${oppScore} Opponent`;
    };

    // Event listeners for double-click events
    leftBox.addEventListener('dblclick', () => {
        let opponentPosition = Math.floor(Math.random() * 3) + 1;
        handleGameResult(opponentPosition);
        opponentPosition = null;
    });

    middleBox.addEventListener('dblclick', () => {
        let opponentPosition = Math.floor(Math.random() * 3) + 1;
        handleGameResult(opponentPosition);
        opponentPosition = null;
    });

    rightBox.addEventListener('dblclick', () => {
        let opponentPosition = Math.floor(Math.random() * 3) + 1;
        handleGameResult(opponentPosition);
        opponentPosition = null;
    });
});
