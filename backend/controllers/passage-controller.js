const express = require("express");
const router = express.Router();
const { User } = require("../models");

//Login
router.post("/login", async(req, res) => {
    try{
        const getUser = await user.findOne({passage_id: req.body.token_id})
        // const getUser = await user.find({})
        if (!getUser) {
            getUser = await user.create({passage_id: req.body.token_id})
        }
        res.status(200).json(getUser);
    } catch (err) {
        res.status(400).json({ error: err})
    }
})

module.exports = router;