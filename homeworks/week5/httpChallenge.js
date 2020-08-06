const request = require('request');

const baseURL = 'https://lidemy-http-challenge.herokuapp.com/api';

const options = {
  method: 'GET',
  url: `${baseURL}/v3/index`,
  headers: {
    // Authorization: 'Basic YWRtaW46YWRtaW4xMjM=',
    // Origin: 'lidemy.com',
    // Proxy: '103.253.27.45:80',
    // 'User-Agent': 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)',
    'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  },
};

request(options, (error, response, body) => {
  console.log(body);
});

/*
request(options, (error, response, body) => {
  try {
    const data = JSON.parse(body);
    return console.log(data);
  } catch (err) {
    return console.log(err);
  }
});
*/
