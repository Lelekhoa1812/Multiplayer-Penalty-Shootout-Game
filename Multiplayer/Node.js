const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Import the path module

const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Object to store invitation codes and corresponding users
const invitationCodes = {};

// Function to check for a match
const checkForMatch = (invitationCode) => {
    return invitationCodes[invitationCode.toLowerCase()];
};

// POST endpoint to create an invitation code
app.post('/create-invitation-code', (req, res) => {
    const { invitationCode } = req.body;
    invitationCodes[invitationCode.toLowerCase()] = true;
    res.json({ success: true });
});

// POST endpoint to check an invitation code
app.post('/check-invitation-code', (req, res) => {
    const { invitationCode } = req.body;
    if (checkForMatch(invitationCode.toLowerCase())) {
        // Remove the invitation code upon finding a match
        delete invitationCodes[invitationCode.toLowerCase()];
        // Print a message to the console
        console.log('Matching user');
        res.json({ success: true });
    } else {
        res.status(404).json({ success: false });
    }
});

const port = process.env.PORT || 8081;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
