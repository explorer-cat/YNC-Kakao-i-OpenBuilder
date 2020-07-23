//2019 08 25 네이버 파싱정보 변경으로 인해 재코딩 필요함
//DateFns 함수 호출의 문제 참고바람.
const express = require('express');
const app = express();
const apiRouter = express.Router();
let bodyParser = require('body-parser');
let Time = require('date-utils');
let cheerio = require('cheerio');
let request = require('request');
let fs = require('fs');
const Request1 = require('request-promise');
const DateFns = require('date-fns');
const koLocale = require('date-fns/locale/ko');
let { total_connect,today_connect } = require('../lib.js');


const TRAIN_TYPE = {
    상행: 'top',
    하행: 'bottom',
};
const GET_TRAIN_TYPE = TRAIN_TYPE.하행;
async function search(text) {
    try {
        const options = {
            uri: 'https://search.naver.com/search.naver',
            qs: {
                where: 'nexearch',
                sm: 'top_hty',
                fbm: 1,
                ie: 'utf8',
                query: text,
            },
            headers: {
                'upgrade-insecure-requests': 1,
                'user-agent':
                'mozilla/5.0 (windows nt 10.0; win64; x64) applewebkit/537.36 (khtml, like gecko) chrome/76.0.3809.100 safari/537.36',
                'accept-language': 'ko,en-US;q=0.9,en;q=0.8',
                referer: 'https://www.naver.com/',
                accept:
                'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            },
        };
        const html = await Request1(options);

        return html;
    } catch (e) {
        // 검색 오류
        console.log(e);
    }

    return null;
}
async function parseTime($, times) {
    if (!times || times.length === 0) {
        return null;
    }

    const time = [];
    for (let i = 0; i < times.length; i += 1) {
        time.push($(times[i]).text());
    }

    return time;
}
async function parseDate($, hours) {
    const date = {};
    const parsedDate = hours.toArray().map(async (hour) => {
        const parent = $(hour).closest('tr');
        const topTime = parent.find('td.lc em');
        const bottomTime = parent.find('td.rc em');

        date[$(hour).text()] = {
            [TRAIN_TYPE.상행]: await parseTime($, topTime),
            [TRAIN_TYPE.하행]: await parseTime($, bottomTime),
        };

        return Promise.resolve();
    });

    if (await Promise.all(parsedDate)) {
        return date;
    }

    return null;
}
async function getTrainDate(prefix, trainType) {
    const html = await search('영대병원역');
    if (!html) {
        console.log('네이버 파싱 오류');
        return;
    }

    const $ = cheerio.load(html);
    const trainHours = $('#timetable_sunday .mid p');
    try {
        const parsedDate = await parseDate($, trainHours);
        const currentDate = new Date();

        const times = Object.keys(parsedDate).filter(time => currentDate.getHours() <= parseInt(time));
        const transformDate = [];

        for (let i = 0; i < times.length; i += 1) {
            const time = times[i];

            for (let j = 0; j < parsedDate[time][trainType].length; j += 1) {
                const trainInfo = parsedDate[time][trainType];
                if (trainInfo) {
                    const date = new Date();
                    const minute = trainInfo[j];

                    if (date.getHours() === parseInt(time) && date.getMinutes() > parseInt(minute)) {
                        continue;
                    }

                    date.setHours(parseInt(time));
                    date.setMinutes(parseInt(minute));
                    date.setMilliseconds(0);
                    date.setSeconds(0);

                    transformDate.push(date);
                }
            }
        }

        return transformDate.slice(0, 3).map((date) => {
            const diff = DateFns.distanceInWordsToNow(date, {
                locale: koLocale,
            });
            return `${prefix} ${diff} 후 도착`;
        });
    } catch (e) {
        console.log('네이버 열차 시간을 가져오는 도중 오류가 발생하였습니다.');
        console.log(e);
    }
}

//반월당역 1호선 코스 검색
async function getTrainDate1(prefix, trainType) {
    const html = await search('반월당역 1호선');
    if (!html) {
        console.log('네이버 파싱 오류');
        return;
    }

    const $ = cheerio.load(html);
    const trainHours = $('#timetable_sunday .mid p');
    try {
        const parsedDate = await parseDate($, trainHours);
        const currentDate = new Date();

        const times = Object.keys(parsedDate).filter(time => currentDate.getHours() <= parseInt(time));
        const transformDate = [];

        for (let i = 0; i < times.length; i += 1) {
            const time = times[i];

            for (let j = 0; j < parsedDate[time][trainType].length; j += 1) {
                const trainInfo = parsedDate[time][trainType];
                if (trainInfo) {
                    const date = new Date();
                    const minute = trainInfo[j];

                    if (date.getHours() === parseInt(time) && date.getMinutes() > parseInt(minute)) {
                        continue;
                    }

                    date.setHours(parseInt(time));
                    date.setMinutes(parseInt(minute));
                    date.setMilliseconds(0);
                    date.setSeconds(0);

                    transformDate.push(date);
                }
            }
        }

        return transformDate.slice(0, 3).map((date) => {
            const diff = DateFns.distanceInWordsToNow(date, {
                locale: koLocale,
            });
            return `${prefix} ${diff} 후 도착`;
        });
    } catch (e) {
        console.log('네이버 열차 시간을 가져오는 도중 오류가 발생하였습니다.');
        console.log(e);
    }
}



async function getTrainDate2(prefix, trainType) {
    const html = await search('반월당역 2호선');
    if (!html) {
        console.log('네이버 파싱 오류');
        return;
    }

    const $ = cheerio.load(html);
    const trainHours = $('#timetable_sunday .mid p');
    try {
        const parsedDate = await parseDate($, trainHours);
        const currentDate = new Date();

        const times = Object.keys(parsedDate).filter(time => currentDate.getHours() <= parseInt(time));
        const transformDate = [];

        for (let i = 0; i < times.length; i += 1) {
            const time = times[i];

            for (let j = 0; j < parsedDate[time][trainType].length; j += 1) {
                const trainInfo = parsedDate[time][trainType];
                if (trainInfo) {
                    const date = new Date();
                    const minute = trainInfo[j];

                    if (date.getHours() === parseInt(time) && date.getMinutes() > parseInt(minute)) {
                        continue;
                    }

                    date.setHours(parseInt(time));
                    date.setMinutes(parseInt(minute));
                    date.setMilliseconds(0);
                    date.setSeconds(0);

                    transformDate.push(date);
                }
            }
        }

        return transformDate.slice(0, 3).map((date) => {
            const diff = DateFns.distanceInWordsToNow(date, {
                locale: koLocale,
            });
            return `${prefix} ${diff} 후 도착`;
        });
    } catch (e) {
        console.log('네이버 열차 시간을 가져오는 도중 오류가 발생하였습니다.');
        console.log(e);
    }
}


apiRouter.post('/subway_banwoldang1', function(req, res) {
      console.log('/subway_banwoldang1 skill start');
  total_connect();
  today_connect(); // today_connect + 1
  (async () => {
  //const trainDate = await getTrainDate1('문양행', TRAIN_TYPE.하행);
  //const trainDate1 = await getTrainDate1('영남대행', TRAIN_TYPE.상행);
  const responseBody = {
  "version": "2.0",
  "template": {
    "outputs": [{
      "simpleText": {
        "text": `현재 지하철 도착 정보 점검중입니다.`,
    
      //  "text": `[반월당역 1호선 도착시간] \n\n${trainDate1.join('\n')}\n\n${trainDate.join('\n')}`,
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
        "label":"반월당역 2호선",
        "messageText": "반월당역 2호선"
      },
      {
        "action":"message",
        "label":"영대병원",
        "messageText": "영대병원"
      },
    ]
  }
}

  res.status(200).send(responseBody);
  })();
});



apiRouter.post('/subway_banwoldang2', function(req, res) {
    console.log('/subway_banwoldang2 skill start');
  total_connect();
  today_connect(); // today_connect + 1
  (async () => {
  const trainDate = await getTrainDate2('문양행', TRAIN_TYPE.상행);
  const trainDate1 = await getTrainDate2('영남대행', TRAIN_TYPE.하행);
  const responseBody = {
  "version": "2.0",
  "template": {
    "outputs": [{
      "simpleText": {
        "text": `현재 지하철 도착 정보 점검중입니다.`,
   //     "text": `[반월당역 2호선 도착시간] \n\n${trainDate1.join('\n')}\n\n${trainDate.join('\n')}`,
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
        "label":"반월당역 1호선",
        "messageText": "반월당역 1호선"
      },
      {
        "action":"message",
        "label":"영대병원",
        "messageText": "영대병원"
      },
    ]
  }
}

  res.status(200).send(responseBody);
  })();
});


apiRouter.post('/subway_ync', function(req, res) {
  console.log('/subway_ync skill start');
  total_connect();
  today_connect(); // today_connect + 1
  (async () => {
  const trainDate = await getTrainDate('설화명곡행', TRAIN_TYPE.상행);
  const trainDate1 = await getTrainDate('안심행', TRAIN_TYPE.하행);
  const responseBody = {
  "version": "2.0",
  "template": {
    "outputs": [{
      "simpleText": {
        "text": `현재 지하철 도착 정보 점검중입니다.`,
    //    "text": `[영대병원역 도착시간] \n\n${trainDate1.join('\n')}\n\n${trainDate.join('\n')}`,
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
        "label":"반월당역 1호선",
        "messageText": "반월당역 1호선"
      },
      {
        "action":"message",
        "label":"반월당역 2호선",
        "messageText": "반월당역 2호선"
      },
    ]
  }
}

  res.status(200).send(responseBody);
  })();
});



module.exports = apiRouter
