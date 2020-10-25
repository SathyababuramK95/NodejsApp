const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//app.use(express.static(__dirname + '../client/public'));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '50mb',extended: true,parameterLimit: 1000000}));
app.use(express.json());
app.use(express.urlencoded({limit: '50mb',extended: false,parameterLimit: 1000000}));

// app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb'}));
require('./routes')(app);
//exports = module.exports = app;

mongoose.connect('mongodb://localhost:27017/nodejsapp');

mongoose.connection.on('connected', function() {
    console.log("connected to database");
});


const port = process.env.port || 3030;
app.listen(port, function(req, res) {
    console.log("Server Started Successfully");
});
    
module.exports = app;