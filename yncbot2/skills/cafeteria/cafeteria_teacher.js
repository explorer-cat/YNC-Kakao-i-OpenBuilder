const express = require('express');
const app = express();
const apiRouter = express.Router();
let { total_connect,today_connect } = require('../lib.js');


/* 교직원 식당 cafeteria_teacher */
apiRouter.post('/cafeteria_teacher', function(req, res) {
  console.log('/cafeteria_teacher skill start');
  today_connect();
  total_connect();
  let d = new Date();
  let week = new Array('일','월','화','수','목','금','토');
  let day = d.getMonth()+1+"월 "+d.getDate()+"일 "+week[d.getDay()]+"요일 식단";


  let XLSX = require('xlsx');
  let file = XLSX.readFile('mysheet.xlsx');
    //첫번째 시트 불러옴
  var firstSheetName = file.SheetNames[0];
  var firstWSheet = file.Sheets[firstSheetName];


if(week[d.getDay()] == '월' && checkTime < checkTime1) {
  var Monday =day+"\r\n\r\n아직 이번주 식단이 업데이트 되지 않았어요! 조금만 기다려주세요"
  } else {
    var Monday= day+"\r\n\r\n[교직원 중식]\r\n"+firstWSheet['B3'].v +"\r\n"+ firstWSheet['B4'].v+"\r\n"+ firstWSheet['B5'].v +"\r\n"+ firstWSheet['B6'].v+"\r\n"+ firstWSheet['B7'].v+"\r\n"+ firstWSheet['B8'].v+"\r\n"+ firstWSheet['B9'].v;
  }
 var Tuesday = day+"\r\n\r\n[교직원 중식]\r\n"+firstWSheet['C3'].v +"\r\n"+ firstWSheet['C4'].v+"\r\n"+ firstWSheet['C5'].v +"\r\n"+ firstWSheet['C6'].v+"\r\n"+ firstWSheet['C7'].v+"\r\n"+ firstWSheet['C8'].v+"\r\n"+ firstWSheet['C9'].v;
  var Wednesday = day+"\r\n\r\n[교직원 중식]\r\n"+firstWSheet['D3'].v +"\r\n"+ firstWSheet['D4'].v+"\r\n"+ firstWSheet['D5'].v +"\r\n"+ firstWSheet['D6'].v+"\r\n"+ firstWSheet['D7'].v+"\r\n"+ firstWSheet['D8'].v+"\r\n"+ firstWSheet['D9'].v;
  var Thursday = day+"\r\n\r\n[교직원 중식]\r\n"+firstWSheet['E3'].v +"\r\n"+ firstWSheet['E4'].v+"\r\n"+ firstWSheet['E5'].v +"\r\n"+ firstWSheet['E6'].v+"\r\n"+ firstWSheet['E7'].v+"\r\n"+ firstWSheet['E8'].v +"\r\n"+ firstWSheet['E9'].v;
  var Friday = day+"\r\n\r\n[교직원 중식]\r\n"+firstWSheet['F3'].v +"\r\n"+ firstWSheet['F4'].v+"\r\n"+ firstWSheet['F5'].v +"\r\n"+ firstWSheet['F6'].v+"\r\n"+ firstWSheet['F7'].v+"\r\n"+ firstWSheet['F8'].v+"\r\n"+ firstWSheet['F9'].v;


  if(week[d.getDay()] == '월') {
   const responseBody = {
   "version": "2.0",
   "template": {
     "outputs": [{
       "simpleText": {
           "text": Monday
         },
       }
     ],
     "quickReplies":[
       {
         "action":"message",
         "label":"오늘 학식",
         "messageText": "오늘 학식 알려줘"
       },
       {
         "action":"message",
         "label":"도서관 자리",
         "messageText": "도서관 자리 알려줘"
       },
       {
         "action":"message",
         "label":"학사 일정",
         "messageText": "19년 학사 일정 알려줘"
       },
       {
         "action":"message",
         "label":"지하철 시간",
         "messageText": "지하철 시간 알려줘"
       },
       {
         "action":"message",
         "label":"교내 번호",
         "messageText": "교내 번호 알려줘"
       },
     ]
   }
 }
     res.status(200).send(responseBody);
   }

  if(week[d.getDay()] == '화') {
  const responseBody = {
  "version": "2.0",
  "template": {
    "outputs": [{
      "simpleText": {
          "text": Tuesday
        },
      }
    ],
    "quickReplies":[
      {
        "action":"message",
        "label":"오늘 학식",
        "messageText": "오늘 학식 알려줘"
      },
      {
        "action":"message",
        "label":"도서관 자리",
        "messageText": "도서관 자리 알려줘"
      },
      {
        "action":"message",
        "label":"학사 일정",
        "messageText": "19년 학사 일정 알려줘"
      },
      {
        "action":"message",
        "label":"지하철 시간",
        "messageText": "지하철 시간 알려줘"
      },
      {
        "action":"message",
        "label":"교내 번호",
        "messageText": "교내 번호 알려줘"
      },
    ]
  }
}
    res.status(200).send(responseBody);
  }

  if(week[d.getDay()] == '수') {
 const responseBody = {
 "version": "2.0",
 "template": {
   "outputs": [{
     "simpleText": {
         "text": Wednesday
       },
     }
   ],
   "quickReplies":[
     {
       "action":"message",
       "label":"오늘 학식",
       "messageText": "오늘 학식 알려줘"
     },
     {
       "action":"message",
       "label":"도서관 자리",
       "messageText": "도서관 자리 알려줘"
     },
     {
       "action":"message",
       "label":"학사 일정",
       "messageText": "19년 학사 일정 알려줘"
     },
     {
       "action":"message",
       "label":"지하철 시간",
       "messageText": "지하철 시간 알려줘"
     },
     {
       "action":"message",
       "label":"교내 번호",
       "messageText": "교내 번호 알려줘"
     },
   ]
 }
}
   res.status(200).send(responseBody);
}

  if(week[d.getDay()] == '목') {
 const responseBody = {
 "version": "2.0",
 "template": {
   "outputs": [{
     "simpleText": {
         "text": Thursday
       },
     }
   ],
   "quickReplies":[
     {
       "action":"message",
       "label":"처음으로",
       "messageText": "처음으로"
     }
   ]
 }
}
   res.status(200).send(responseBody);
}

  if(week[d.getDay()] == '금') {
 const responseBody = {
 "version": "2.0",
 "template": {
   "outputs": [{
     "simpleText": {
         "text": Friday
       },
     }
   ],
   "quickReplies":[
     {
       "action":"message",
       "label":"처음으로",
       "messageText": "처음으로"
     },
     {
       "action":"message",
       "label":"기숙사 식당",
       "messageText": "기숙사 식당"
     },
     {
       "action":"message",
       "label":"교직원 식당",
       "messageText": "교직원 식당"
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
}

  if(week[d.getDay()] == '토' || week[d.getDay()] == '일') {
  const responseBody = {
  "version": "2.0",
  "template": {
    "outputs": [{
      "simpleText": {
          "text": "주말은 식단이 없습니다."
        },
      }
    ],
    "quickReplies":[
      {
        "action":"message",
        "label":"처음으로",
        "messageText": "처음으로"
      },
    ]
  }
}




    res.status(200).send(responseBody);
}

});



module.exports = apiRouter
