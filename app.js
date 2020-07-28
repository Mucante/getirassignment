const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');
const Post = require('./models/Post');

//to parse and convert request's json body
app.use(bodyParser.json());

//Routes
app.get('/', (req,res) => {
    res.send('we are on main page');
});
app.post('/', (req,res) => {
   const post = new Post({
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    minCount: req.body.minCount,
    maxCount: req.body.maxCount
   });
   res.json(post);

});

//Connect to Database
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true},
 () => console.log('connected to db!') );

app.listen(3000);