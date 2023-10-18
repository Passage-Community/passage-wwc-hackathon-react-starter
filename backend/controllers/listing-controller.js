const express = require("express");
const router = express.Router();
const { User } = require("../models");
const { Listing } = require("../models");
require("dotenv").config();





//retrieving listing by radius of location
// router.get("/radius", async (req, res) => {
//     try {
//       console.log("b");
//       const searchRadius = 8046 //5 miles in radius
//       db.Listing.createIndex( { zipCoords : "2dsphere" } )
//       const nearByListing = Listing.find({ zipCoords:
//         { $near: {
//             $geometry: [req.body.zipCoords.coordinates[0], req.body.zipCoords.coordinates[1]],
//             $maxDistance: searchRadius
//           }
//         }
//       });
//     //   const allListing = await Listing.find({

//     //   });
//     //   console.log(allListing);
//     console.log(nearByListing)
//       res.status(200).json(nearByListing);
//     } catch (err) {
//       res.status(400).json({ error: err });
//     }
//   });


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
    try {
        const zipCode = req.body.zipCode
        fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=${process.env.GEOCODE_API_KEY}&location=${zipCode}`)
        .then((res) => res.json())
        .then( async (json) => {
            const zipInfo = (json.results[0].locations[0].latLng);
            req.body.zipCoords = { type: "Point", coordinates: [zipInfo.lat, zipInfo.lng]};
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
