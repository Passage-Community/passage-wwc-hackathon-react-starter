const express = require("express");
const router = express.Router();
const { User } = require("../models");

//Login
router.post("/login", async(req, res) => {
    try{
        const getUser = await User.findOne({passage_id: req.body.psg_auth_token})
        // const getUser = await user.find({})
        if (!getUser) {
            getUser = await User.create({passage_id: req.body.psg_auth_token})
        }
        res.status(200).json(getUser);
    } catch (err) {
        res.status(400).json({ error: err})
    }
})

module.exports = router;