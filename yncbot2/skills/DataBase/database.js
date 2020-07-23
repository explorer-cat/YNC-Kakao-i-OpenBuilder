// config/database.js
const express = require('express');
const app = express();
const apiRouter = express.Router();
let mysql      = require('mysql');
let dbconfig   = require('./database.js');
let connection = mysql.createConnection(dbconfig);


module.exports = {
  host     : 'localhost',
  user     : 'root',
  password : root',
  port     :'3306',
  database : 'db',
  connectionLimit: 1000,
  pool:{
    max:1000,
    min:0,
    idle:10000
  },
  debug: false,
  timezone: 'utc',
  supportBigNumbers: true,
  bigNumberStrings: true
};
