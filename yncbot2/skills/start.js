﻿﻿﻿const express = require('express');
const app = express();
const apiRouter = express.Router();
const mysql      = require('mysql');
const dbconfig   = require('./DataBase/database.js');
const connection = mysql.createConnection(dbconfig);
var tempPool = mysql.createPool(dbconfig);
let { today_time,today_connect,total_connect,getMysqlConnect} = require('./lib.js');



apiRouter.post('/start', function(req, res) {
today_time();
total_connect(); //toyal_connect + 1
today_connect(); // today_connect + 1

  const responseBody = {

      "version": "2.0",
  "template": {
    "outputs": [{
        "carousel": {
          "type": "basicCard",
          "items": [
            {
            //  "description": "현재 영이공봇 2.0 리뉴얼 개발중 테스트 과정입니다. 일부 기능이 이상하거나 작동이 안될 수도 있습니다.",
             "description": "",
              "thumbnail": {
                "imageUrl": "http://blogattach.naver.net/fd68e154447677c1eb066d5f6486f88e20728cd7/20190205_151_blogfile/sqlstyle_1549304448766_QXQS94_png/%ED%95%99%EC%8B%9D.png"
              },
              "buttons": [
                {
                  "action": "message",
                  "label": "학식",
                  "messageText": "오늘 학식 알려줘"
                },
                {
                  "action": "message",
                  "label": "도서관",
                  "messageText": "도서관 자리 알려줘"
                },

              ]
            },
            {
              "description": "",
              "thumbnail": {
                "imageUrl": "http://blogattach.naver.net/df4ac370623f3be7c829457e40a0dea30c50ae4c8a/20190205_221_blogfile/sqlstyle_1549304445301_HK2nDs_png/%ED%95%99%EC%82%AC%EC%9D%BC%EC%A0%95.png"
              },
              "buttons": [
                {
                  "action": "message",
                  "label": "학사일정",
                  "messageText": "학사 일정"
                },
                {
                  "action": "message",
                  "label": "학사질문",
                  "messageText": "질문"
                },
              ]
            },
            {
              "description": "",
              "thumbnail": {
                "imageUrl": "http://blogattach.naver.net/35a0299a8bd1d10d22c3af94aa4a3449e6ba44a6f5/20190205_217_blogfile/sqlstyle_1549304440071_9jzBu1_png/%EB%B2%84%EC%8A%A4.png"
              },
              "buttons": [
                {
                  "action": "message",
                  "label": "스쿨버스",
                  "messageText": "스쿨버스 시간표 알려줘"
                },
                {
                  "action": "message",
                  "label": "지하철",
                  "messageText": "지하철 시간"
                },
                {
                  "action": "message",
                  "label": "날씨",
                  "messageText": "오늘 날씨 알려줘"
                },
              ]
            },
            {
              "description": "",
              "thumbnail": {
                "imageUrl": "http://blogattach.naver.net/990c8533221213a58f62093b00e29cea4416e828/20190205_251_blogfile/sqlstyle_1549304434686_3P8a0V_png/%EA%B0%9C%EB%B0%9C%EC%A0%95%EB%B3%B4.png"
              },
              "buttons": [
                {
                  "action": "message",
                  "label": "오늘 하루 사용량",
                  "messageText": "오늘 하루 사용량"
                },
               {
                  "action": "message",
                  "label": "전체 사용량",
                  "messageText": "전체 사용량"
                },
                {
                  "action": "message",
                  "label": "info",
                  "messageText": "개발 정보"
                },
              ]
            },
          ]
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
        "label":"많이 하는 질문",
        "messageText": "질문"
      },
      {
        "action":"message",
        "label":"오늘 날씨",
        "messageText": "오늘 날씨 알려줘"
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


module.exports = apiRouter
