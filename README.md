<p>
    <img src="https://storage.googleapis.com/passage-docs/passage-logo-gradient.svg" alt="Passage logo" style="width:150px;"/>
    <img src="https://bookface-images.s3.amazonaws.com/logos/f193d070e480ede387ee00a9006482bee4a6b8dd.png" alt="Women Who Code logo" style="width:150px;"/>

</p>

# Passage Auth - React App with Express.js Backend Hackathon Starter

Women Who Code Hackathon for Social Good 2023 

[Hackathon Website](https://hopin.com/events/wwcode-hackathon-for-social-good/registration)

This repository acts as a boilerplate for React/Express applications with 1Password's [Passage Authentication](https://passage.1password.com/). The team at Passage has created this with the hope to make it easy for everyone to contribute to hackathon projects as quickly as possible. The app is ready to go with Passage biometric or magic link user authentication. 


## Passage 

Passage is a authentication as a service platform that allows you to provide passwordless authentication to your users without having to worry about the initial setup and continue maintence high quality authentication requires. 

To get started with the boilerplat you'll first need to set up a Passage app. You can do this by visiting [console.passage.id](console.passage.id) or following our [quickstart guide](https://docs.passage.id/getting-started/quickstart#create-an-app-in-the-passage-console). 

You can reach out to the team forsupport via [Discord](https://discord.com/invite/445QpyEDXh).

![Alt text](<Screenshot 2023-10-02 at 6.46.04 PM.png>)

---

# Installation
To run this application, follow the instructions below to install and start the application.



### Configure Your Environment Variables

1. Rename the EXAMPLE.env file to .env for both the frontend and backend directories
2. Replace the example variables for each .env file with your own Passage App ID and API Key. You can get these from the [Passage Console](https://console.passage.id).

## Install Dependencies & Run Backend/Frontend

Backend dependencies
```bash
cd backend/
npm i
node server.js
cd ..
```

Frontend dependencies
```bash
cd frontend/
npm i
npm run start
cd ..
```

The application will run on http://localhost:3000, which you can navigate to in your browser.

## Authenticate Requests With Passage

Navigate to [http://localhost:3000](http://localhost:3000) and see what it's like authenticating users using Passage with React and an Express.js backend!

<br/><br/>

# Using Passage with Express.js
Import passage from npm:
```javascript
const Passage = require("@passageidentity/passage-node");
```

Instantiate the Passage class:
```javascript
const passage = new Passage({
  appID: process.env.PASSAGE_APP_ID,
  apiKey: process.env.PASSAGE_API_KEY,
  authStrategy: "HEADER",
});
```

Declare an Express route and use the instantiated Passage class to authenticate users!
```javascript
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
```


<br/><br/>

# Using Passage with React

## Importing and Using the Passage-Auth Custom Element
The easiest way to add authentication to a web frontend is with a Passage Auth custom element. First you'll need to install the [passage-elements](https://www.npmjs.com/package/@passageidentity/passage-elements) package from npm:
```
npm i --save @passageidentity/passage-elements
```
Then import the package in the module where you intend to use the custom element
```
import '@passageidentity/passage-elements/passage-auth'
```
Importing this script will register the Passage custom element for use in your React components. For more information about custom elements refer to the [online documentation](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements).

Its then just a matter of embedding the passage-auth element into your component that will handle login. This is done in this example in the home component:
```html
<div className="form-container">
  <passage-auth
    app-id={process.env.REACT_APP_PASSAGE_APP_ID}
  />
</div>
```
