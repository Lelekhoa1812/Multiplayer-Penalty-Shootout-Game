document.addEventListener('DOMContentLoaded', () => {
    const glove = document.getElementById('glove');
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
    scoreboard.textContent = `Player 1 ${score1} - ${score2} Player 2`;

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft' && positionIndex > 1) {
            positionIndex--;
            moveglove();
        } else if (event.key === 'ArrowRight' && positionIndex < 3) {
            positionIndex++;
            moveglove();
        }
    });
});
