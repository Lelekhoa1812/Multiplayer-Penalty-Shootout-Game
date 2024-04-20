const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Object to store invitation codes and corresponding users
const invitationCodes = {};

// POST endpoint to create an invitation code
app.post('/create-invitation-code', (req, res) => {
    const { userId, invitationCode } = req.body;
    invitationCodes[invitationCode.toLowerCase()] = userId;
    res.json({ success: true });
});

// POST endpoint to check an invitation code
app.post('/check-invitation-code', (req, res) => {
    const { invitationCode } = req.body;
    const userId = invitationCodes[invitationCode.toLowerCase()];
    if (userId) {
        res.json({ success: true, userId });
    } else {
        res.json({ success: false, error: 'Invalid invitation code' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
