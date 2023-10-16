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

//retrieve information from one user by their passage ID
router.post("/getUserProfile", async (req, res) => {
    try {
        const getUser = await User.findOne({passage_id: req.body.psg_auth_token})
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
router.post("/updateUserProfile", async (req, res) => {
  try {
    
    const updatedUser = await User.findByIdAndUpdate(
        req.body.id,
        {
            ...(req.body.firstname && {firstname: req.body.firstname}),
            ...(req.body.lastname && {lastname: req.body.lastname}),
            ...(req.body.email && {email: req.body.email}),
            ...(req.body.zipcode && {zipcode: req.body.zipcode})
        },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});




module.exports = router;