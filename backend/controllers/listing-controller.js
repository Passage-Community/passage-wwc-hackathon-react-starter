const express = require("express");
const router = express.Router();
const { User } = require('../models');
const { Listing } = require('../models')


// retrieve information from all listings
router.get("/", async (req, res) => {
  try {
    console.log("a");
    const allListing = await Listing.find({});
    console.log(allListing)
    res.status(200).json(allListing);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

//retrieve information from one Listing by their Listing ID
router.get("/:id", async (req, res) => {
    try {
        const getOneListing = await Listing.findOne({_id: req.params.id})
        res.status(200).json(getOneListing);
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

//retrieve information from one Listing by their user ID
router.get("/user/:id", async (req, res) => {
    try {
        const getUserListings = await Listing.find({userID: req.params.id})
        res.status(200).json(getUserListings);
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

// creates user listing
router.post("/", async (req, res) => {
  console.log(req);
  try {
    const newListing = await Listing.create(req.body);
    res.status(200).json(newListing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


//edit Listing for user
router.put("/:id", async (req, res) => {
    try {
      const updatedListing = await Listing.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      res.status(201).json(updatedListing);
    } catch (err) {
      res.status(400).json({ error: err });
    }
  });


//delete Listing for usser
router.delete("/:id", async (req, res) => {
    try {
      const deletedListing = await Listing.findByIdAndDelete(req.params.id);
      res.status(200).json(deletedListing);
    } catch (err) {
      res.status(400).json({ error: err });
    }
  });



module.exports = router;