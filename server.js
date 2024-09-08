const express = require('express');
const cors = require('cors');
const agora = require('agora-access-token'); // Make sure to install this library

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

const APP_ID = 'c1ccb094672f4e5cac808f0ed59407ca';
const APP_CERTIFICATE = '49b9e82d156c4e6fa1c728e18ef4d400';

app.get('/get_token', (req, res) => {
  const { channelName } = req.query;
  const uid = Math.floor(Math.random() * 1000); // Generate a random UID
  const token = agora.RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    channelName,
    uid,
    agora.RtcRole.PUBLISHER,
    Math.floor(Date.now() / 1000) + 3600
  );
  res.json({ token });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
