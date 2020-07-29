const mongoose = require('mongoose');

//result object schema
const ResultSchema = mongoose.Schema({
    code: Number,
    msg: String,
    records: [{ _id: false, key: String, createdAt: Date, totalCount: Number }]
  }, { _id: false });

  module.exports= mongoose.model('ResultItem', ResultSchema);
