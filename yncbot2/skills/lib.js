﻿var mysql      = require('mysql');
var dbconfig   = require('./DataBase/database.js');
var connection = mysql.createConnection(dbconfig);
var tempPool = mysql.createPool(dbconfig);


//서버가 구동된 시간 체크 함수.
let server_up = function() {
  var newDate = new Date();
  var time = newDate.toFormat('YYYY-MM-DD HH:MM');
  tempPool.getConnection(function(err,connection) {
      connection.query("INSERT INTO server_up(upTime) VALUES ('"+time+"')", function (err, result ,rows) {
       if(err){
            connection.release();
            throw err;
        }
           connection.release();
      });
  });
};


//명령 connect + 1 함수
let today_connect = function() {
  var newDate = new Date();
  var maintime = newDate.toFormat('YYYY-MM-DD');
  tempPool.getConnection(function(err,connection) {
  var sql = "UPDATE today_time SET connect = connect + 1 WHERE date = '"+maintime+"';";
  connection.query(sql, function (err, result ,rows) {
    if(err){
         connection.release();
         throw err;
     }
         connection.release();
      });
  });
};

//총 connect 된 횟수 계산 함수
let total_connect = function() {
  tempPool.getConnection(function(err,connection) {
  var newDate = new Date();
  var maintime = newDate.toFormat('YYYY-MM-DD');
     connection.query("UPDATE total_time SET connect = connect + 1 WHERE id = 1;", function (err, result ,rows) {
       if(err){
           connection.release();
            throw err;
        }
           connection.release();
       });
  });
};

//다음날이 되었을시 새로운 데이터를 insert 해주는 함수
let today_time = function() {
  var newDate = new Date();
  var maintime = newDate.toFormat('YYYY-MM-DD');
      tempPool.getConnection(function(err,connection) {
      connection.release();
      connection.query("SELECT * FROM today_time WHERE date = '"+maintime+"';", function (err, result ,rows) {
    if(err){
         connection.release();
         throw err;
     }
    if(result.length == '0') {
        connection.query("INSERT INTO today_time (connect, date) VALUES ('1', '"+maintime+"');", function (err, result ,rows) {
        console.log('DB에 NewDate 정보가 추가되었습니다.');
        });
      } return;
    });
  });
};


function getMysqlConnect() {
  setTimeout(getMysqlConnect, 3000); // 5분마다 한번씩 Threads_connected 자동으로 알려줌
    tempPool.getConnection(function(err,connection) {
        connection.query("SHOW STATUS WHERE `variable_name` = 'Threads_connected';", function (err, results ,rows,status) {
        if(err){
             connection.release();
             throw err;
         }
            connection.release();
            console.log('Database Connection : '+results[0].Value);
        });
      });
  }




module.exports = { today_connect,today_time,total_connect,server_up,getMysqlConnect};
