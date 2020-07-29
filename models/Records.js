const mongoose = require('mongoose');

//record object schema
const RecordSchema = mongoose.Schema({
    key: String,
    createdAt: Date,
    totalCount: Number
  }, { _id: false });
  
  module.exports= mongoose.model('RecordItem', RecordSchema);
  