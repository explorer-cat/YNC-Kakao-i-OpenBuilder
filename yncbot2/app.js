﻿const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const apiRouter = express.Router();
const mysql      = require('mysql');
 const dbconfig   = require('./skills/DataBase/database.js');
 const connection = mysql.createConnection(dbconfig);
var tempPool = mysql.createPool(dbconfig);
let { server_up,getMysqlConnect } = require('./skills/lib.js');

//app.use(logger('dev', {}));
app.use(bodyParser.urlencoded({ 
  extended: true
}));
getMysqlConnect();
connection.on('error', function() {})

//ejs 세팅
//app.use(express.static('./'));
//app.set('view engine','ejs');
//app.set('views','./');

// dashboard get index.KHTML file
//  app.get('/', function (req,res) {
    /*
      var newDate = new Date();
      var maintime = newDate.toFormat('YYYY-MM-DD');
      var sql = "SELECT connect FROM total_time WHERE id = 1;";
      connection.query(sql, function (err, rows,result) {
      var getTotal = rows[0].connect

      var sql = "SELECT connect FROM today_time WHERE date = '"+maintime+"';";
      connection.query(sql, function (err, rows,result) {
      var getToday = rows[0].connect

      var sql = "SELECT * FROM `server_up`ORDER BY `server_up`.`upTime` DESC LIMIT 1;";
      connection.query(sql, function (err, rows,result) {
      res.render('index',{
    // 렌더링 할 변수 리스트 적어주세용.
            getTotal,
            getToday,
            server_up,
        });
      });
    });
  });
  */
//});






//시작 스킬
let start = require('./skills/start.js');
app.use('/skills', start);

//기숙사 학식 스킬
let cafeteria_dormitory = require('./skills/cafeteria/cafeteria_dormitory.js');
app.use('/skills/cafeteria', cafeteria_dormitory);

//학생식당 학식 스킬
let cafeteria_student = require('./skills/cafeteria/cafeteria_student.js');
app.use('/skills/cafeteria', cafeteria_student);

//교직원식당 학식 스킬
let cafeteria_teacher = require('./skills/cafeteria/cafeteria_teacher.js');
app.use('/skills/cafeteria', cafeteria_teacher);

//도서관 열람 좌석 스킬
let library_seat = require('./skills/library/library_seat.js');
app.use('/skills/library', library_seat);

//지하철 도착 시간 스킬
let subway_time = require('./skills/subway/subway_time.js');
app.use('/skills/subway', subway_time);

//19학년도 학사일정
let schedule = require('./skills/schedule/schedule.js');
app.use('/skills/schedule', schedule);

//오늘 날씨
let weather = require('./skills/weather/today_weather.js');
app.use('/skills/weather', weather);

//대쉬보드
let total_connect = require('./skills/developer/total_connect.js');
app.use('/skills/developer', total_connect);

//대쉬보드
let today_connect = require('./skills/developer/today_connect.js');
app.use('/skills/developer', today_connect);

//covid19
let covid19 = require('./skills/covid/covid19.js');
app.use('/skills/covid', covid19);


app.listen(3005, function() {
  server_up(); //server_up time insert function
  console.log('영남이공대학교 봇이 실행되었습니다.1');
});
