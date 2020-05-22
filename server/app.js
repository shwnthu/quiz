

global.express = require('express');
global.mysql = require('mysql');  // My Sql node package.

global.router = express.Router();
global.HttpStatus = require('http-status');
// global.morgan = require('morgan');
// global.request = require('request');
var bodyParser = require('body-parser');
global.hashPassword = require('password-hash');
global.nodemailer = require('nodemailer');
global.jwt = require('jsonwebtoken');
global.ip = require("ip");
var cors = require('cors');
global.fs = require('fs');
global.uuidv1 = require('uuid/v1');
require('dotenv').config();
// global.config = require('./dbconfig/dbconfig').config;
global.uuidAPIKey = require('uuid-apikey');
global._ = require('lodash');
global.app = express();

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors(true));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});




/* Start  new implementation*/
// app.use(require('./router/otp'));



app.listen(process.env.PORT, err => {
    if (err) throw err;
    console.log(process.env.PORT, "Server Connected.....!");

});

module.exports = app;
