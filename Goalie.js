document.addEventListener('DOMContentLoaded', () => {
    const glove = document.getElementById('glove');
    const positionBoxes = document.querySelectorAll('.position-box');

    let goalieDecision = null;

    glove.addEventListener('dragstart', () => {
        goalieDecision = null;
    });

    positionBoxes.forEach(box => {
        box.addEventListener('drop', () => {
            if (box.classList.contains('left')) {
                goalieDecision = 'left';
            } else if (box.classList.contains('middle')) {
                goalieDecision = 'middle';
            } else if (box.classList.contains('right')) {
                goalieDecision = 'right';
            }
        });
    });

    glove.addEventListener('dragend', () => {
        if (goalieDecision) {
            console.log('Goalie decision:', goalieDecision);
        } else {
            console.log('Please select a position to defend.');
        }
    });
});
