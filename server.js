const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const JsonWebToken = require('jsonwebtoken');


const app = express();
const jwt_secret_key = "JSONWEBTOKEN_SECRETKEY";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '50mb',extended: true,parameterLimit: 1000000}));
app.use(express.json());
app.use(express.urlencoded({limit: '50mb',extended: false,parameterLimit: 1000000}));

app.use((req,res,next)=>{
    let url = req.originalUrl.split('/')
    let token = req.headers.authorization;
    if(url[2] && (url[2] == 'registeruser' || url[2] == 'loginuser')){
      next();
    }else{
      JsonWebToken.verify(token, jwt_secret_key, function(err, decoded) {
        if(err){
          res.send('Invalid  token');
        }else{
            next();
        }
      });
    } 
});

require('./routes')(app);

mongoose.connect('mongodb://localhost:27017/nodejsapp');

mongoose.connection.on('connected', function() {
    console.log("connected to database");
});


const port = process.env.port || 3030;
app.listen(port, function(req, res) {
    console.log("Server Started Successfully");
});
    
module.exports = app;