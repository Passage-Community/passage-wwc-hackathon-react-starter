const express = require("express");
const router = express.Router();
const { User } = require("../models");
const { Listing } = require("../models");
require("dotenv").config();


//gets the zopcode and turns it into latitude and longitude
router.get("/zipp", async(req,res) => {

try {
    const zipcode = "87123"
fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=${process.env.GEOCODE_API_KEY}&location=${zipcode}`)
  .then((res) => res.json())
  .then((json) => {
    // setData(json.results);
    const zipInfo = json.results[0].locations[0].latLng
    console.log(zipInfo)
    res.status(200).json(zipInfo)
  })
  .catch(console.error);
} catch (err) {
    res.status(400).json({ error: err });
  }
});

//retrieve all zipcodes
router.get("/getzip", async (req, res) => {
  try {
    console.log("b");
    db.Listing.createIndex({ zipcode: "2dsphere" });
    const zipData = zipcodes.lookup(req.body.zipCode);
    console.log(zipData);
    //   const allListing = await Listing.find({});
    //   console.log(allListing)
    //   res.status(200).json(allListing);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// retrieve information from all listings
router.get("/", async (req, res) => {
  try {
    console.log("a");
    const allListing = await Listing.find({});
    console.log(allListing);
    res.status(200).json(allListing);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

//retrieve information from one Listing by their Listing ID
router.get("/:id", async (req, res) => {
  try {
    const getOneListing = await Listing.findOne({ _id: req.params.id });
    res.status(200).json(getOneListing);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

//retrieve information from one Listing by their user ID
router.get("/user/:id", async (req, res) => {
  try {
    const getUserListings = await Listing.find({ userID: req.params.id });
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
    // const zipcode =req.body.zipcode
    // console.log(zipcode)
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
