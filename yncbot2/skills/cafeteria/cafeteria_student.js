const express = require('express');
const app = express();
const apiRouter = express.Router();
let { total_connect,today_connect } = require('../lib.js');
/* 학생 식당 cafeteria_student */
apiRouter.post('/cafeteria_student', function(req, res) {
  console.log('/cafeteria_student skill start');
  today_connect();
  total_connect();
  let d = new Date();
  let week = new Array('일','월','화','수','목','금','토');
  let day = d.getMonth()+1+"월 "+d.getDate()+"일 "+week[d.getDay()]+"요일 식단";
  var checkTime = d.toFormat('HH24:MI:SS');
  var checkTime1 = d.toFormat('11:30:00')



  let XLSX = require('xlsx');
  let file = XLSX.readFile('mysheet.xlsx');
  //첫번째 시트 불러옴
  let firstSheetName = file.SheetNames[0];
  let firstWSheet = file.Sheets[firstSheetName];
  if(week[d.getDay()] == '월' && checkTime < checkTime1) {
    var Mondayfood =day+"\r\n\r\n아직 이번주 식단이 업데이트 되지 않았어요! 조금만 기다려주세요"
  } else {
  var Monday = day+"\r\n\r\n[학생식당 중식]\r\n"+firstWSheet['B10'].v +"\r\n"+ firstWSheet['B11'].v+"\r\n"+ firstWSheet['B12'].v +"\r\n"+ firstWSheet['B13'].v+"\r\n\r\n[테이크아웃]\r\n"+ firstWSheet['B14'].v;
  }
  var Tuesday = day+"\r\n\r\n[학생식당 중식]\r\n"+firstWSheet['C10'].v +"\r\n"+ firstWSheet['C11'].v+"\r\n"+ firstWSheet['C12'].v +"\r\n"+ firstWSheet['C13'].v+"\r\n\r\n[테이크아웃]\r\n"+ firstWSheet['C14'].v;
  var Wendesday = day+"\r\n\r\n[학생식당 중식]\r\n"+firstWSheet['D10'].v +"\r\n"+ firstWSheet['D11'].v+"\r\n"+ firstWSheet['D12'].v +"\r\n"+ firstWSheet['D13'].v+"\r\n\r\n[테이크아웃]\r\n"+ firstWSheet['D14'].v;
  var Thursday = day+"\r\n\r\n[학생식당 중식]\r\n"+firstWSheet['E10'].v +"\r\n"+ firstWSheet['E11'].v+"\r\n"+ firstWSheet['E12'].v +"\r\n"+ firstWSheet['E13'].v+"\r\n\r\n[테이크아웃]\r\n"+ firstWSheet['E14'].v;
  var Friday =day+"\r\n\r\n[학생식당 중식]\r\n"+firstWSheet['F10'].v +"\r\n"+ firstWSheet['F11'].v+"\r\n"+ firstWSheet['F12'].v +"\r\n"+ firstWSheet['F13'].v+"\r\n\r\n[테이크아웃]\r\n"+ firstWSheet['F14'].v;


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
         "label":"처음으로",
         "messageText": "처음으로"
       }
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
        "label":"처음으로",
        "messageText": "처음으로"
      }
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
         "text": Wendesday
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
