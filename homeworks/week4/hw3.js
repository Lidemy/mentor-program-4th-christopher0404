const request = require('request');

const url = 'https://restcountries.eu/rest/v2';
const name = process.argv[2];

request(`${url}/name/${name}`, (error, response, body) => {
  if (error || response.statusCode === 404) {
    console.error('找不到國家資訊');
    return;
  }
  JSON.parse(body).forEach((country) => {
    console.log('============');
    console.log(`國家：${country.name}`);
    console.log(`首都：${country.capital}`);
    console.log(`貨幣：${country.currencies[0].code}`);
    console.log(`國碼：${country.callingCodes[0]}`);
  });
});
