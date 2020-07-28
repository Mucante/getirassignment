const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
startDate: Date,
endDate: Date,
minCount: Number,
maxCount: Number
});

module.exports = mongoose.model('Post', PostSchema);