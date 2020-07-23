const express = require('express');
let cheerio = require('cheerio');
let request = require('request');
const app = express();
const apiRouter = express.Router();
let { total_connect,today_connect } = require('../lib.js');


apiRouter.post('/schedule', function(req, res) {
  console.log('/schedule skill start');
  var d = new Date();
  var day = d.getMonth()+1+"월";
    today_connect();
    total_connect();

  const responseBody =
  {
    "version": "2.0",
    "template": {
      "outputs": [
        {
          "basicCard": {
            "description": "이번달은 "+day+" 입니다! 다른달의 일정이 궁금하시다면 아래 버튼을 클릭하시거나 검색을 통해 찾아주세요!\n\n 검색방법 : 1월 / 1 , 12월 / 12",
            "thumbnail": {
              "imageUrl": "http://k.kakaocdn.net/dn/83BvP/bl20duRC1Q1/lj3JUcmrzC53YIjNDkqbWK/i_6piz1p.jpg"
            },
            "buttons": [
              {
                "action": "message",
                "label": day+" 일정 보기",
                "messageText": day
              }
            ]
          }
        }
      ],
      "quickReplies":[
        {
          "action":"message",
          "label": "3월",
          "messageText": "3월",
        },
        {
          "action":"message",
          "label": "4월",
          "messageText": "4월",
        },
        {
          "action":"message",
          "label": "5월",
          "messageText": "5월",
        },
        {
          "action":"message",
          "label": "6월",
          "messageText": "6월",
        },
        {
          "action":"message",
          "label": "7월",
          "messageText": "7월",
        },
        {
          "action":"message",
          "label": "8월",
          "messageText": "8월",
        },
        {
          "action":"message",
          "label": "9월",
          "messageText": "9월",
        },
        {
          "action":"message",
          "label": "10월",
          "messageText": "10월",
        },
        {
          "action":"message",
          "label": "11월",
          "messageText": "11월",
        },
        {
          "action":"message",
          "label": "12월",
          "messageText": "12월",
        },
      ]
    }
  }
  res.status(200).send(responseBody);
});


module.exports = apiRouter
