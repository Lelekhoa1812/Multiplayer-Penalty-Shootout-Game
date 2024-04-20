document.addEventListener('DOMContentLoaded', () => {
    const ball = document.getElementById('ball');
    const positionBoxes = document.querySelectorAll('.position-box');

    let shooterDecision = null;

    ball.addEventListener('dragstart', () => {
        shooterDecision = null;
    });

    positionBoxes.forEach(box => {
        box.addEventListener('drop', () => {
            if (box.classList.contains('left')) {
                shooterDecision = 'left';
            } else if (box.classList.contains('middle')) {
                shooterDecision = 'middle';
            } else if (box.classList.contains('right')) {
                shooterDecision = 'right';
            }
        });
    });

    ball.addEventListener('dragend', () => {
        if (shooterDecision) {
            console.log('Shooter decision:', shooterDecision);
        } else {
            console.log('Please select a position to shoot.');
        }
    });
});
