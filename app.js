const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv/config');
const MongoClient = require('mongodb').MongoClient;
const dbName = "getir-case-study";
const mongoose = require('mongoose');
const Records = require('./models/Records');
const Results = require('./models/Results');

//to parse and convert request's json body
app.use(bodyParser.json());

//Post Method
app.post('/', (req, res) => {
  //connect to db  
  MongoClient.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);

    //array where we will keep all the filtered records
    var filteredArray = [];

    //prepare request's initial variables
    var firstDate = new Date(req.body.startDate);
    var secondDate = new Date(req.body.endDate);
    var minCount = new Number(req.body.minCount);
    var maxCount = new Number(req.body.maxCount);

    //query to filter incoming data by date limitations
    var query = { createdAt: { $gte: firstDate, $lte: secondDate } };

    dbo.collection("records").find(query).toArray(function (err, result) {
      if (err) throw err;

      //to sum the counts array and check if the value is between mincount and maxcount
      result.forEach(function (current) {
        var totalCount = current.counts.reduce(function (a, b) {
          return a + b;
        }, 0);
        if (totalCount <= maxCount && totalCount >= minCount) {
          //add the record to array
          var CurrentItem = new Records({
            key: current.key,
            createdAt: current.createdAt,
            totalCount: totalCount
          })
          filteredArray.push(CurrentItem);
        }
      });//end of foreach

      //create response object by using schema.
      var ResponseToSend = new Results({
        code: 0,
        msg: "Success",
        records: filteredArray
      })

      //just response for testing
      res.json(ResponseToSend);
      db.close();
    });
  });
});

const port = process.env.PORT || 3000

app.listen(port,() => {
  console.log(`Server running at port `+port);
});
