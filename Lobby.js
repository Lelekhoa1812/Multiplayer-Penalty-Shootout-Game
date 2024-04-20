document.addEventListener('DOMContentLoaded', () => {
    const instructionModal = document.getElementById('instruction-modal');
    const instructionBtn = document.getElementById('instruction-btn');
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
    instructionModal.querySelector('.close').addEventListener('click', () => {
        instructionModal.style.display = 'none';
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
                                window.location.href = 'Shooter.html';
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
                                window.location.href = 'Goalie.html';
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