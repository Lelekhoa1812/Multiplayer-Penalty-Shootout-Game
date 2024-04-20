document.addEventListener('DOMContentLoaded', () => {
    const ball = document.getElementById('ball');
    const leftBox = document.querySelector('.leftbox');
    const middleBox = document.querySelector('.middlebox');
    const rightBox = document.querySelector('.rightbox');

    let positionIndex = 2; // Initially placed in the middle position box

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

    // Event listener for left and right arrow keys
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft' && positionIndex > 1) {
            positionIndex--;
            moveBall();
        } else if (event.key === 'ArrowRight' && positionIndex < 3) {
            positionIndex++;
            moveBall();
        }
    });
});
