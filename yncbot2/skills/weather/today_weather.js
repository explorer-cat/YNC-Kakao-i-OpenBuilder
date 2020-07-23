const express = require('express');
const app = express();
const apiRouter = express.Router();
let cheerio = require('cheerio');
let request = require('request');
let { total_connect,today_connect } = require('../lib.js');
//const iconv = require('iconv-lite');
var jschardet   = require('jschardet');

apiRouter.post('/today_weather', function(req, res) {
    console.log('/today_weather skill start');
    request('http://weather.naver.com/rgn/cityWetrCity.nhn?cityRgnCd=CT007007', function (error, response, html) {
      if (error) {
          throw error
      };
      var $ = cheerio.load(html);
      //현재시간 파싱
      var time = $('div.fl>h5>span').text();
      //온도와 날씨 파싱
      var temp = $('div.fl>em').text();
      var temp1 = temp.replace(/\s/g, '');
      var temp2 = temp1.replace("℃", "℃ ");
      //2시간예보
      var mise =  $('li.after_h').text();
      var mise1= mise.replace(/\s/g, '');
      var mise2 = mise1.replace(/예보/gi," 예보 ");
      var mise3= mise2.replace(/맑음/gi,"맑음\n");
      var mise4= mise3.replace(/흐림/gi,"흐림\n");
      var mise5= mise4.replace(/비/gi,"비\n");
      //현재 강수확률
      var rain = $('div.fl>p>strong').text();


  const responseBody = {
  "version": "2.0",
  "template": {
    "outputs": [{
      "simpleText": {
          "text":"["+time+"시 현재 날씨]\n기온/날씨 : "+temp2+"\n강수 확률 : "+rain+"%\n\n[예상 예보]\n"+mise5
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
