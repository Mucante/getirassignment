const Records = require('../models/records');
const Results = require('../models/results');
var moment = require('moment');

function findRecords(client, dbName, req, res) {
    client.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) {
            console.log(err);
            var ResponseToSend = new Results({
                code: 1,
                msg: "error",
                records: []
              })
              return res.status(500).json(ResponseToSend);            
        };
        var dbo = db.db(dbName);
    
        // array where we will keep all the filtered records
        var filteredArray = [];
    
        // validate & prepare request's initial variables
        var validationErr = validateRecordRequestParams(req)
        if (validationErr) {
            var ResponseToSend = new Results({
                code: -1,
                msg: validationErr,
                records: []
              })
              return res.status(400).json(ResponseToSend);
        }
        var firstDate = new Date(req.body.startDate);
        var secondDate = new Date(req.body.endDate);
        var minCount = new Number(req.body.minCount);
        var maxCount = new Number(req.body.maxCount);
    
        // query to filter incoming data by date limitations
        var query = { createdAt: { $gte: firstDate, $lte: secondDate } };
    
        dbo.collection("records").find(query).toArray(function (err, result) {
          if (err) {
            console.log(err);
            var ResponseToSend = new Results({
                code: 1,
                msg: "error",
                records: []
              })
              return res.status(500).json(ResponseToSend);
          }
    
          // to sum the counts array and check if the value is between mincount and maxcount
          result.forEach(function (current) {
            var totalCount = current.counts.reduce(function (a, b) {
              return a + b;
            }, 0);
            if (totalCount <= maxCount && totalCount >= minCount) {
              var CurrentItem = new Records({
                key: current.key,
                createdAt: current.createdAt,
                totalCount: totalCount
              })
              filteredArray.push(CurrentItem);
            }
          });

          var ResponseToSend = new Results({
            code: 0,
            msg: "Success",
            records: filteredArray
          })
    
          // send response
          db.close();
          return res.json(ResponseToSend);
        });
      });
}

// validates incoming request parameters & 
// if a parameter is bad, returns an error.
function validateRecordRequestParams(req) {
    // expected date format -> YYYY-MM-DD
    const DATE_FORMAT = "YYYY-MM-DD"
    try {
        moment(req.body.startDate, DATE_FORMAT, true)
        moment(req.body.endDate, DATE_FORMAT, true)
    } catch(err) {
        console.log(err);
        return new Error("unexpected date format in request parameters");
    }

    var min_count = new Number(req.body.minCount);
    var max_count = new Number(req.body.maxCount);

    if (isNaN(min_count) || isNaN(max_count)) {
        return new Error("one or more count variable are not a number");
    } else if(min_count > max_count) {
        return new Error("minCount should not be bigger than maxCount");
    }
    return null;
}

exports.findRecords = findRecords;