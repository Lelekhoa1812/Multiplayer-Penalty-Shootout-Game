document.addEventListener('DOMContentLoaded', () => {
    const instructionModal = document.getElementById('instruction-modal');
    const instructionBtn = document.getElementById('instruction-btn');
    const singleModal = document.getElementById('single-modal');
    const singleBtn = document.getElementById('single-btn');
    const goalkeeperBtn = document.getElementById('goalkeeper-btn');
    const shooterBtn = document.getElementById('shooter-btn');
    const createCodeBtn = document.getElementById('create-code-btn');
    const enterCodeBtn = document.getElementById('enter-code-btn');
    const waitingModal = document.getElementById('waiting-modal');

    // Function to check for match
    function checkForMatch(invitationCode) {
        // Send HTTP POST request to check invitation code
        return fetch('/check-invitation-code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ invitationCode }),
        })
        .then(response => response.json())
        .then(data => data.success)
        .catch(error => {
            console.error('Error:', error);
            return false;
        });
    }

    // Display instructions modal
    instructionBtn.addEventListener('click', () => {
        instructionModal.style.display = 'block';
    });
    // Close instructions modal
    instructionModal.querySelector('.modal-content .close').addEventListener('click', () => {
        instructionModal.style.display = 'none';
    });
    // Display single player mode modal
    singleBtn.addEventListener('click', () => {
        singleModal.style.display = 'block';
        goalkeeperBtn.style.display = 'block';
        shooterBtn.style.display = 'block';
    });
    // Close single player mode modal
    singleModal.querySelector('.modal-content .close').addEventListener('click', () => {
        singleModal.style.display = 'none';
        goalkeeperBtn.style.display = 'none';
        shooterBtn.style.display = 'none';
    });
    // Redirect to single-goalkeeper page
    goalkeeperBtn.addEventListener('click', () => {
        window.location.href = 'Singleplayer/Goalie.html'
    });
    // Redirect to single-shooter page
    shooterBtn.addEventListener('click', () => {
        window.location.href = 'Singleplayer/Shooter.html'
    });

    // Display invitation modal
    createCodeBtn.addEventListener('click', () => {
        // Enter code logic
        const invitationCode = prompt('Create Invitation Code').toLowerCase();
        // Check code length
        if (invitationCode.length < 4) {
            alert('Invitation code must be at least 4 characters long.');
            return;
        }

        // Send HTTP POST request to create invitation code
        fetch('/create-invitation-code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ invitationCode }),
        })
        .then(response => {
            if (response.ok) {
                // Display waiting modal
                waitingModal.style.display = 'block';
                // Poll for match
                const interval = setInterval(() => {
                    checkForMatch(invitationCode)
                        .then(matchFound => {
                            if (matchFound) {
                                clearInterval(interval);
                                window.location.href = 'Multiplayer/Shooter.html';
                            }
                        });
                }, 1000);
            } else {
                console.error('Failed to create invitation code');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    enterCodeBtn.addEventListener('click', () => {
        // Enter code logic
        const enteredCode = prompt('Enter Invitation Code').toLowerCase();
        // Check code length
        if (enteredCode.length < 4) {
            alert('Invitation code must be at least 4 characters long.');
            return;
        }

        // Send HTTP POST request to check invitation code
        fetch('/check-invitation-code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ invitationCode: enteredCode }),
        })
        .then(response => {
            if (response.ok) {
                // Display waiting modal
                waitingModal.style.display = 'block';
                // Poll for match
                const interval = setInterval(() => {
                    checkForMatch(enteredCode)
                        .then(matchFound => {
                            if (matchFound) {
                                clearInterval(interval);
                                window.location.href = 'Multiplayer/Goalie.html';
                            }
                        });
                }, 1000);
            } else {
                console.error('Invalid invitation code');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
