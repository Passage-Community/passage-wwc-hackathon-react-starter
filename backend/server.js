const express = require("express");
const Passage = require("@passageidentity/passage-node");
const cors = require("cors");
const userController = require("./controllers/user-controller");
const listingController = require("./controllers/listing-controller")
const messageController = require("./controllers/message-controller");

const app = express();
const PORT = 8000;
const CLIENT_URL = "http://localhost:3000";

require("dotenv").config();
require("./config/db.connection");

app.use(express.json());
app.use(
  cors({
    origin: CLIENT_URL,
  })
);

app.use("/user", userController);
app.use("/listing", listingController)
app.use("/message", messageController)


const passage = new Passage({
  appID: process.env.PASSAGE_APP_ID,
  apiKey: process.env.PASSAGE_API_KEY,
  authStrategy: "HEADER",
});


//add more fields from passage.console later
app.post("/auth", async (req, res) => {
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


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
