const mongoose = require('mongoose');

// record object schema
// totalcount will be the sum of numbers inside counts array
const RecordSchema = mongoose.Schema({
    key: String,
    createdAt: Date,
    totalCount: Number
  }, { _id: false });
  
  module.exports= mongoose.model('RecordItem', RecordSchema);
  