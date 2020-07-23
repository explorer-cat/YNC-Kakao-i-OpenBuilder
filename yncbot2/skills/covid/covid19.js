const express = require('express');
const app = express();
const apiRouter = express.Router();
let cheerio = require('cheerio');
let request = require('request');
let { total_connect,today_connect } = require('../lib.js');
//const iconv = require('iconv-lite');
var jschardet   = require('jschardet');


/*지역별 코로나 현황을 위한 배열임 */

apiRouter.post('/covid19_Seaul', function(req, res) {
  console.log('/covid19_Seaul skill start');

  request('http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=13&ncvContSeq=&contSeq=&board_id=&gubun=', function (error, response, html) {
    if (error) {
        throw error
    };
    var $ = cheerio.load(html);
    var map_city1 = $('div.data_table>table.num>tbody>tr:td-child(1)').text(); //서울

    console.log(map_city1+"\r\n\r\n");
   // console.log(map_name);
    var map_city1_Seaul = new Array();

const responseBody = {
"version": "2.0",
"template": {
  "outputs": [{
    "simpleText": {
        "text": "서울지역 코로나 현황\r\n전일대비 확진환자 증감 :" + 명 + ""
      },
    }
  ],
}
}

res.status(200).send(responseBody);
  });
});


apiRouter.post('/covid19', function(req, res) {
    console.log('/covid19 skill start');

    request('http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=13&ncvContSeq=&contSeq=&board_id=&gubun=', function (error, response, html) {
      if (error) {
          throw error
      };
      var $ = cheerio.load(html);
      var map_name = $('div.data_table>table.num>tbody>th.row').text();
      var map_city1 = $('div.data_table>table.num>tbody>tr:nth-child(1)').text(); //서울

      console.log(map_city1+"\r\n\r\n");
     // console.log(map_name);
      var map_city1_Seaul = new Array();
    

      //현재시간 파싱
      var time = $('div.timetable>p.info').text(); //기준시간 okay

      var data = $('div.rpsa_detail>div>div.open>div.mapview>ul.cityinfo').text();
      var temp = data.replace("확진환자","확진환자 : ");
      var temp1 = temp.replace("전일 대비 증감(+","(전일 +");
      var temp2 = temp1.replace("격리중","\r\n격리환자 : ");
      var temp3 = temp2.replace("누적 격리해제","\r\n누적 격리해제 : ");
      var temp4 = temp3.replace("사망자","\r\n사망자 : ");
      var temp5 = temp4.replace("10만명당 발생률","\r\n10만명당 발생률 : ");



  const responseBody = {
  "version": "2.0",
  "template": {
    "outputs": [{
      "simpleText": {
          "text": "["+time+"]\r\n\r\n"+temp5+"\r\n\r\n데이터 출처:ncov.mohw.go.kr"
        },
      }
    ],
    "quickReplies":[
      {
        "action":"message",
        "label":"대구지역",
        "messageText": "처음으로"
      },
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
