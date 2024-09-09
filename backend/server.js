const express = require('express');
const cors = require('cors');
const { PSN, exchangeNpssoForCode, exchangeCodeForAccessToken, getUserTitles } = require('psn-api');

const app = express();
const port = 3001;

app.use(cors()); // Enable CORS for your React app

// This endpoint returns a list of game titles
app.get('/games', async (req, res) => {
  try {
    // Replace with your actual NPSSO token
    const myNpsso = 'rm2FAaeCR3OhcWoT2hocMWxohiPzVtCS7tHy1ZvbBWmZB4GFaFm92Hy3G70PjQLc';

    // Exchange NPSSO for access code
    const accessCode = await exchangeNpssoForCode(myNpsso);

    // Exchange access code for access token
    const authorization = await exchangeCodeForAccessToken(accessCode);

    // Use the access token to get user titles
    const trophyTitlesResponse = await getUserTitles(
      { accessToken: authorization.accessToken },
      'me'
    );

    res.json(trophyTitlesResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch games' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
