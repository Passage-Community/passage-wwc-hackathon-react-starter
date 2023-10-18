const express = require("express");
const router = express.Router();
const { Message } = require('../models')

2
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

//retrieve retrieve last 20 message between fromUser and ToUser
router.get("/:fromId/:toUser", async (req, res) => {
    var filterA = {};
    try {
        const filter = BuildQuery(req.params);
        const getmessages = await Message.find(filter).limit(20);
        res.status(200).json({filter: filter, messages: getmessages});
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message, filter:filterA });
    }
});

router.get("/:fromId/:toUser/:date", async (req, res) => {});

router.get("/penpals/:userId", async (req, res) => {
    try {
        const getmessages = await Message.aggregate(  [
            {
              $match: {
                FromUserID: req.params.userId
              }
            },
            { $group: { _id: '$ToUserID' } }
          ],
          { maxTimeMS: 60000, allowDiskUse: true }
        );
        res.status(200).json({ writers: getmessages});
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message, filter:filterA });
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
    var filterA = {$and: [{ToUserID: p.toUser }, {FromUserID:p.fromId}]};
    var filterB = {$and: [{ToUserID: p.fromId }, {FromUserID:p.toUser}]};
    var filter = {ToUserID: p.toUser };
    return filter;
}



module.exports = router;