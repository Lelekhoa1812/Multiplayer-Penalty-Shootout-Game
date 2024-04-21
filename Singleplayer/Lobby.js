document.addEventListener('DOMContentLoaded', () => {
    const shooterBtn = document.getElementById('shooter-btn');
    const goalkeeperBtn = document.getElementById('goalkeeper-btn');

    shooterBtn.addEventListener('click', () => {
        window.location.href = 'Shooter.html';
    });
    goalkeeperBtn.addEventListener('click', () => {
        window.location.href = 'Goalie.html';
    });
    
});
