const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');

//Middlewares
app.use('/', () => {
console.log('middleware running test');
});


//Routes
app.get('/', (req,res) => {
    res.send('we are on main page');
});

//Connect to Database
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true},
 () => console.log('connected to db!') );

app.listen(3000);