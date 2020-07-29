const mongoose = require('mongoose');

// result object schema
// code value of 0 means that the operation was a success
// code value of 1 means that there was an issue and the server is to be blamed
// code value of -1 means that there was an issue and the client is to be blamed
const ResultSchema = mongoose.Schema({
    code: Number,
    msg: String,
    records: [{ _id: false, key: String, createdAt: Date, totalCount: Number }]
  }, { _id: false });

  module.exports= mongoose.model('ResultItem', ResultSchema);
