﻿﻿const express = require('express');
const app = express();
const apiRouter = express.Router();
const mysql      = require('mysql');
const dbconfig   = require('../DataBase/database.js');
const connection = mysql.createConnection(dbconfig);
let { today_time,today_connect,total_connect } = require('../lib.js');



apiRouter.post('/total_connect', function(req, res) {
  console.log('/dashboard skill start');
  today_time();
  total_connect(); //toyal_connect + 1
  today_connect(); // today_connect + 1

  // dashboard get index.KHTML file


  var newDate = new Date();
  var maintime = newDate.toFormat('YYYY-MM-DD');
  var day = newDate.toFormat('DD');
  var sql = "SELECT connect FROM total_time WHERE id = 1;";
  connection.query(sql, function (err, rows,result) {
  var getTotal = rows[0].connect

  var sql = "SELECT connect FROM today_time WHERE date = '"+maintime+"';";
  connection.query(sql, function (err, rows,result) {
  var getToday = rows[0].connect


  var sql = "SELECT * FROM `server_up`ORDER BY `server_up`.`upTime` DESC LIMIT 1;";
  connection.query(sql, function (err, rows,result) {
  var server_up = rows[0].upTime

  const responseBody = {

      "version": "2.0",
  "template": {
    "outputs": [{
      "simpleText": {
          "text": "영이공봇은 현재까지 총 " +getTotal+ "회 사용 되었습니다."
        },
      }
    ],
    "quickReplies":[
      {
        "action":"message",
        "label":"하루 사용량",
        "messageText": "오늘 하루 사용량"
      },
      {
        "action":"message",
        "label":"개발 정보",
        "messageText": "개발 정보"
      },
      {
        "action":"message",
        "label":"처음으로",
        "messageText": "처음으로"
      },
    ]
  }
}

 res.status(200).send(responseBody);
        });
     });
  });
});


module.exports = apiRouter
