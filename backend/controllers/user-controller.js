const express = require("express");
const router = express.Router();
const { User } = require('../models');

//retrieve information from all users
router.get("/allUsers", async (req, res) => {
  try {
    console.log("a");
    const allUsers = await User.find({});
    console.log(allUsers)
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

//retrieve information from one user
router.get("/oneUser/:id", async (req, res) => {
    try {
        const oneUser = await User.findById(
          req.params.id);
        res.status(200).json(oneUser);
      } catch (err) {
        res.status(400).json({ error: err });
      }});


// creates user account
router.post("/createUserProfile", async (req, res) => {
  console.log(req);
  try {
    const newUserProfile = await User.create(req.body);
    res.status(201).json(newUserProfile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


//update user profile
router.post("/UpdateUserProfile/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});




module.exports = router;