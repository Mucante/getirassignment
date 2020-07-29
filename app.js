const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv/config');

const RecordAPI = require('./api/record');

const dbName = "getir-case-study";

// base express app obj
const app = express();
app.use(bodyParser.json());
// v1/record apis
const router = express.Router();
router.post('/record', (req, res) => {
   RecordAPI.findRecords(MongoClient, dbName, req, res);
});
app.use('/v1', router);

const port = process.env.PORT || 3000;

app.listen(port,() => {
  console.log(`Server running at port `+port);
});
