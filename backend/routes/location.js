const express = require("express");
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const uri = "";

const router = express.Router();

const client = new MongoClient(uri);

router.post("/add-location", (req, res, next) => {
  // send locatiob to do DB
  async function run() {
    try {
      await client.connect();
      const database = client.db("demo");
      const collection = database.collection("user-loc");
      const query = {
        address: req.body.address,
        coords: { lat: req.body.lat, lang: req.body.lng },
      };
      const location = await collection.insertOne(query);
      console.log(location);
      res.json({
        message: "Stored mtored location!",
        data: location.insertedId,
      });
    } finally {
     
    }
  }
  run().catch(console.dir);
});

router.post("/location", (req, res, next) => {
  console.log(req.body.id);
  if (req.body.id) {
    async function runGet() {
      try {
        console.log(req.body.id);
        await client.connect();
        const database = client.db("demo");
        const collection = database.collection("user-loc");
        // Query for a movie that has the title 'The Room'
        const query = { _id: new mongodb.ObjectId(req.body.id) };
        const locId = await collection.findOne(query);
        console.log(locId);
        res.json(locId);
        // since this method returns the matched document, not a cursor, print it directly
      } finally {
        
      }
    }
    runGet().catch(console.dir);
  }


});


module.exports = router;
