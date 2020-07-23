const express = require('express');
const app = express();
const apiRouter = express.Router();
let { total_connect,today_connect } = require('../lib.js');

/* 기숙사 식당 cafeteria_dormitory 월요일 스킬*/
apiRouter.post('/cafeteria_dormitory', function(req, res) {
  today_connect();
  total_connect();

  var d = new Date();
  var week = new Array('일','월','화','수','목','금','토');
  var day = d.getMonth()+1+"월 "+d.getDate()+"일 "+week[d.getDay()]+"요일 식단";
    var checkTime = d.toFormat('HH24:MI:SS');
    var checkTime1 = d.toFormat('11:30:00')


  let XLSX = require('xlsx');
  let file = XLSX.readFile('mysheet.xlsx');
  //첫번째 시트 불러옴
  let firstSheetName = file.SheetNames[0];
  let firstWSheet = file.Sheets[firstSheetName];


  /*주 식단 업데이트 안했을 경우,*/
  if(week[d.getDay()] == '월' && checkTime < checkTime1) {
    var Mondayfood =day+"\r\n\r\n아직 이번주 식단이 업데이트 되지 않았어요! 조금만 기다려주세요"
    } else {
      var Mondayfood = day+"\r\n\r\n[생활관 석식]\r\n"+firstWSheet['B15'].v +"\r\n"+ firstWSheet['B16'].v+"\r\n"+ firstWSheet['B17'].v+"\r\n"+ firstWSheet['B18'].v+"\r\n"+ firstWSheet['B19'].v+"\r\n"+ firstWSheet['B20'].v;
    }
  var Mondayfood = day+"\r\n\r\n[생활관 석식]\r\n"+firstWSheet['B14'].v +"\r\n"+firstWSheet['B15'].v +"\r\n"+ firstWSheet['B16'].v+"\r\n"+ firstWSheet['B17'].v+"\r\n"+ firstWSheet['B18'].v+"\r\n"+ firstWSheet['B19'].v;
  var Tuesdayfood = day+"\r\n\r\n[생활관 석식]\r\n"+firstWSheet['C14'].v +"\r\n"+firstWSheet['C15'].v +"\r\n"+ firstWSheet['C16'].v+"\r\n"+ firstWSheet['C17'].v+"\r\n"+ firstWSheet['C18'].v+"\r\n"+ firstWSheet['C19'].v;
  var Wednesdayfood = day+"\r\n\r\n[생활관 석식]\r\n"+firstWSheet['D14'].v +"\r\n"+firstWSheet['D15'].v +"\r\n"+ firstWSheet['D16'].v+"\r\n"+ firstWSheet['D17'].v+"\r\n"+ firstWSheet['D18'].v+"\r\n"+ firstWSheet['D19'].v;
  var Thursdayfood = day+"\r\n\r\n[생활관 석식]\r\n"+firstWSheet['E14'].v +"\r\n"+firstWSheet['E15'].v +"\r\n"+ firstWSheet['E16'].v+"\r\n"+ firstWSheet['E17'].v+"\r\n"+ firstWSheet['E18'].v+"\r\n"+ firstWSheet['E19'].v;
   var Frdayfood =day+"\r\n\r\n[생활관 석식]\r\n"+firstWSheet['F14'].v +"\r\n"+firstWSheet['F15'].v +"\r\n"+ firstWSheet['F16'].v+"\r\n"+ firstWSheet['F17'].v+"\r\n"+ firstWSheet['F18'].v+"\r\n"+ firstWSheet['F19'].v;


  if(week[d.getDay()] == '월') {
   const responseBody = {
   "version": "2.0",
   "template": {
     "outputs": [{
       "simpleText": {
           "text": Mondayfood
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
         "label":"다른 식당",
         "messageText": "다른 식당"
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
          "text": Tuesdayfood
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
        "label":"다른 식당",
        "messageText": "다른 식당"
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
         "text": Wednesdayfood
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
       "label":"다른 식당",
       "messageText": "다른 식당"
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
         "text": Thursdayfood
       },
     }
   ],
   "quickReplies":[
     {
       "action":"message",
       "label":"처음으로",
       "messageText": "다른 식당"
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

  if(week[d.getDay()] == '금') {
 const responseBody = {
 "version": "2.0",
 "template": {
   "outputs": [{
     "simpleText": {
         "text": Frdayfood
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
