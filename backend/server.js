const express = require('express');
const Passage = require('@passageidentity/passage-node');
const cors = require('cors');
const users = require('./api/routes/users-route');
const app = express();

// const CLIENT_URL = 'http://localhost:3000';

require("dotenv").config();

app.use(express.json());
app.use(cors());

const passage = new Passage({
  appID: process.env.PASSAGE_APP_ID,
  apiKey: process.env.PASSAGE_API_KEY,
  authStrategy: "HEADER",
});

app.use('/api/users', users);

app.use('*', (req, res) => res.send(`<h2>Route not handled ${req.baseUrl}</h2>`));

app.post('/auth', async (req, res) => {
  try {
    const userID = await passage.authenticateRequest(req);
    if (userID) {
      // user is authenticated
      const { email, phone } = await passage.user.get(userID);
      const identifier = email ? email : phone;

      res.json({
        authStatus: "success",
        identifier,
      });
    }
  } catch (e) {
    // authentication failed
    console.log(e);
    res.json({
      authStatus: "failure",
    });
  }
});

module.exports = app;
