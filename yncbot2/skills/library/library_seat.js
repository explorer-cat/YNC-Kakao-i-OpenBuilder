const express = require('express');
const app = express();
const apiRouter = express.Router();
let cheerio = require('cheerio');
let request = require('request');
let { total_connect,today_connect } = require('../lib.js');

// apiRouter.post('/library_seat', function(req, res) {
//   console.log('/library_seat skill start');
//   today_connect();
//   total_connect();
//   const responseBody = {
//   "version": "2.0",
//   "template": {
//     "outputs": [{
//       "simpleText": {
//           "text": "도서관 자리안내 장비가 켜져있어야지만 정보를 불러올수있습니다."
//         },
//       }
//     ],
//     "quickReplies":[
//       {
//         "action":"message",
//         "label":"처음으로",
//         "messageText": "처음으로"
//       },
//       {
//         "action":"message",
//         "label":"19년 학사일정",
//         "messageText": "19년 학사일정"
//       },
//     ]
//   }
// }

//   res.status(200).send(responseBody);
// });



apiRouter.post('/library_seat', function(req, res) {
  var url = 'http://lib.ync.ac.kr/SeatState.ax';

    request(url, function (error, response, html) {

      if (error) {
          throw error
      };
      var $ = cheerio.load(html);
      var value = $('table.tbl_ync>tbody').text();
      var good = value.replace(/\s/g, '');
      var value1 = $('table.tbl_ync>tbody>tr>td>strong').text();

      var tag = value1[0]; // strong 태그 0번째 데이터 (1열람실 잔여석)
      var tag1 = value1[1]; //storng 태그 1번째 데이터 (2열람실 잔여석)
      var tag2 = value1[2]; // strong 태그 0번째 데이터 (1열람실 잔여석)
      var tag3 = value1[3]; //storng 태그 1번째 데이터 (2열람실 잔여석)

      var tag4 = value1[4]; //storng 태그 1번째 데이터 (2열람실 잔여석)
      var tag5 = value1[5]; //storng 태그 1번째 데이터 (2열람실 잔여석)
      var tag6 = value1[6]; //storng 태그 1번째 데이터 (2열람실 잔여석)

      if(good.startsWith('제1열람실(1층)') && tag5 == null && tag6 == null && tag4 != null && tag3 != null) {
        good = '현재 시스템 오류로 전체 잔여좌석만 알려드립니다. 잠시후 다시 시도해주세요.\r\n\r\n전체 158석 중 잔여 '+tag3+tag4+'석'
      }
      if(good.startsWith('제1열람실(1층)') && tag5 == null && tag4 == null && tag3 == null) {
        good = '제 1열람실 (1층)\r\n좌석수 84석 / 잔여좌석 '+tag+'석 \r\n\r\n제 2열람실(2층)\r\n좌석수 74석 / 잔여좌석 '+tag1+'석\r\n\r\n전체 158석 중 잔여 '+tag2+'석'
      }

      if (good.startsWith('제1열람실(1층)') && tag5 != null && tag4 != null && tag3 !=null && tag6 == null) {
          good = '제 1열람실 (1층)\r\n좌석수 84석 / 잔여좌석 '+tag+tag1+'석 \r\n\r\n제 2열람실(2층)\r\n좌석수 74석 / 잔여좌석 '+tag2+tag3+'석\r\n\r\n전체 158석 중 잔여 '+tag4+tag5+'석'
        }

        if (good.startsWith('제1열람실(1층)') && tag6 != null && tag5 != null && tag4 != null && tag3 !=null) {
            good = '제 1열람실 (1층)\r\n좌석수 84석 / 잔여좌석 '+tag+tag1+'석 \r\n\r\n제 2열람실(2층)\r\n좌석수 74석 / 잔여좌석 '+tag2+tag3+'석\r\n\r\n전체 158석 중 잔여 '+tag4+tag5+tag6+'석'
          }
  const responseBody = {
  "version": "2.0",
  "template": {
    "outputs": [{
      "simpleText": {
          "text": good
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
});
});




module.exports = apiRouter
