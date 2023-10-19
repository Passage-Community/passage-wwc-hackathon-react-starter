const express = require("express");
const router = express.Router();
const { User } = require("../models");
const { Listing } = require("../models");
require("dotenv").config();

// retrieve information from all listings
router.get("/", async (req, res) => {
  try {
    //if filter is kept as an empty object, shows all listings
    let filter = {};
    //destructing the listing object
    let { zipCode, distance, category } = req.query;
    //if searching for zipcode and distance, example: url = http://localhost:3000/listing?zipCode=76120&distance=50 
    // api turns zipcode into longitude and latitude
    //store lat & long into zipinfo
    // filter then adds a key called zipCoords containing the distance away from said coordinates
    if (zipCode && distance) {
        await fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=${process.env.GEOCODE_API_KEY}&location=${zipCode}`)
        .then((res) => res.json())
        .then( (json) => {
            const zipInfo = (json.results[0].locations[0].latLng);
            filter.zipCoords = { 
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [zipInfo.lng, zipInfo.lat]
                    },
                    $maxDistance: (Number(distance) * 1609.344)
                }
            }
        })
    }

    //checks if filter object has zipcoords and category. If category exists in the req.query(url) add category key along with value from the query
    filter = {
        ...filter,
        ...(category && {category: category})
    };

    console.log(filter);
    //search listing by whatever is in filter
    const allListing = await Listing.find(filter);
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
    try {
        const zipCode = req.body.zipCode
        fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=${process.env.GEOCODE_API_KEY}&location=${zipCode}`)
        .then((res) => res.json())
        .then( async (json) => {
            const zipInfo = (json.results[0].locations[0].latLng);
            req.body.zipCoords = { type: "Point", coordinates: [zipInfo.lng, zipInfo.lat]};
            const newListing = await Listing.create(req.body);
            res.status(200).json(newListing);
        })
        .catch(console.error);
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
