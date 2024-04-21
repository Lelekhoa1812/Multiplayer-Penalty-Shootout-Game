document.addEventListener('DOMContentLoaded', () => {
    const createCodeBtn = document.getElementById('create-code-btn');
    const enterCodeBtn = document.getElementById('enter-code-btn');
    const waitingModal = document.getElementById('waiting-modal');

    // Function to check for match
    function checkForMatch(invitationCode) {
        // Send HTTP POST request to check invitation code
        return fetch('https://penaltyshootout-nd70803wu-lelekhoa1812s-projects.vercel.app/check-invitation-code', {
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

    // Display waiting modal
    const displayWaitingModal = () => {
        waitingModal.style.display = 'block';
    };

    // Event listener for creating invitation code
    createCodeBtn.addEventListener('click', () => {
        const invitationCode = prompt('Create Invitation Code').toLowerCase();
        // Check code length
        if (invitationCode.length < 4) {
            alert('Invitation code must be at least 4 characters long.');
            return;
        }
        // Display waiting modal
        displayWaitingModal();
        // Send HTTP POST request to create invitation code
        fetch('https://penaltyshootout-nd70803wu-lelekhoa1812s-projects.vercel.app/create-invitation-code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ invitationCode }),
        })
        .then(response => {
            if (response.ok) {
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

    // Event listener for entering invitation code
    enterCodeBtn.addEventListener('click', () => {
        const enteredCode = prompt('Enter Invitation Code').toLowerCase();
        // Check code length
        if (enteredCode.length < 4) {
            alert('Invitation code must be at least 4 characters long.');
            return;
        }
        // Display waiting modal
        displayWaitingModal();
        // Send HTTP POST request to check invitation code
        fetch('https://penaltyshootout-nd70803wu-lelekhoa1812s-projects.vercel.app/check-invitation-code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ invitationCode: enteredCode }), // Change variable name to invitationCode
        })
        .then(response => {
            if (response.ok) {
                // Poll for match
                const interval = setInterval(() => {
                    checkForMatch(enteredCode) // Change variable name to invitationCode
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
