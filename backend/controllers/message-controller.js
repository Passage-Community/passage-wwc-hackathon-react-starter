const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { Message } = require('../models')


router.get("/", async (req, res) => {
    try {
      console.log("a");
      const allListing = await Message.find({});
      console.log(allListing)
      res.status(200).json(allListing);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message});
    }
  });


  router.get("/penpals/:userId", async (req, res) => {
    try {
        const getmessages = await Message.aggregate(  [
            {
              $match: {
                fromUserID: req.params.userId
              }
            },
            { $group: { _id: '$toUserID' } }
          ],
          { maxTimeMS: 60000, allowDiskUse: true }
        );
        res.status(200).json({ writers: getmessages});
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message});
    }

});

//retrieve retrieve last 20 message between fromUser and ToUser
router.get("/:fromId/:toUser", async (req, res) => {
    try {
        var filter = BuildQuery(req.params);
//        const getmessages = await Message.find(filter).limit(20);
        var  query = Message.find(filter);
        console.log(query.getFilter());
        query = query.limit(20);
        const getmessages = await query.exec();
        res.status(200).json({filter: filter, messages: getmessages});
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message});
    }
});

router.get("/:fromId/:toUser/:date", async (req, res) => {

    var filter = {};
    try {
        filter = BuildQuery(req.params);
        filter = {$and:[filter, {"sendAt": {"$lt": new Date(req.params.date)}}]};
        const getmessages = await Message.find(filter).limit(20);
        res.status(200).json({filter: filter, messages: getmessages});
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message, filter:filter });
    }
});


/*
db.getCollection('messages').aggregate(
  [
    {
      $match: {
        FromUserID: '6530076dd128d58567d48136'
      }
    },
    { $group: { _id: '$ToUserID' } }
  ],
  { maxTimeMS: 60000, allowDiskUse: true }
);
*/

function BuildQuery(p)
{
    console.log(p);
    var filterA = {$and: [{toUserID: p.toUser }, {fromUserID:p.fromId}]};
    var filterB = {$and: [{toUserID: p.fromId }, {fromUserID:p.toUser}]};
    var filter = {$or: [filterA, filterB]};  

    return filter;
}



module.exports = router;