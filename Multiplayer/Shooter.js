document.addEventListener('DOMContentLoaded', () => {
    const ball = document.getElementById('ball');
    const leftBox = document.querySelector('.leftbox');
    const middleBox = document.querySelector('.middlebox');
    const rightBox = document.querySelector('.rightbox');
    const scoreboard = document.getElementById('scoreboard');

    let positionIndex = 2; // Initially placed in the middle position box
    let score1 = 0; // Initial user1 score
    let score2 = 0; // Initial user2 score

    // Event listeners for position boxes
    leftBox.addEventListener('click', () => {
        positionIndex = 1;
        moveball();
    });

    middleBox.addEventListener('click', () => {
        positionIndex = 2;
        moveball();
    });

    rightBox.addEventListener('click', () => {
        positionIndex = 3;
        moveball();
    });

    // Function to move the ball to the specified position box
    const moveball = () => {
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
    moveball();

    // Initialize the scoreboard
    scoreboard.textContent = `Player 1 ${score1} - ${score2} Player 2`;

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft' && positionIndex > 1) {
            positionIndex--;
            moveball();
        } else if (event.key === 'ArrowRight' && positionIndex < 3) {
            positionIndex++;
            moveball();
        }
    });
});
