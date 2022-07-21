const express = require('express')
const app = express()
const uri = require('./uri').uri
var cors = require('cors')
app.use(cors())
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



const { MongoClient, ServerApiVersion } = require('mongodb');
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const port = process.env.PORT||5000;

client.connect(err => {
    const collection = client.db('workoutEntry').collection('entryData');
    app.post('/workoutData', async (req, res) => {
        const entryData = req.body
        console.log(entryData)
        const query = {date:  entryData.date};
        const update = {$set: entryData};
        const options = { upsert: true };
        await collection.updateOne(query, update, options);
    })

    app.get('/workoutData', async (req, res) => {
        const dateQuery = req.query
        let data = null
        if (dateQuery.date === "all") {
            data = await collection.find()
            data = await data.toArray()
        } else {
            data = await collection.findOne(dateQuery)
        }

        
        res.send(data)
    })

    app.delete('/workoutData', async(req, res) => {
        const delQuery = req.body
        console.log(delQuery)
        await collection.deleteOne(delQuery)
        res.send(delQuery)
    })
  })

  process.on('SIGINT', function() {
    client.close(function () {
      console.log('Mongoose disconnected on app termination');
      process.exit(0);
    });
  });


app.listen(port, () =>
  console.log(`Example app listening on port ${port}`),
);