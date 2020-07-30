const request = require('request');

request(
  {
    url: 'https://api.twitch.tv/kraken/games/top',
    headers: {
      'Client-ID': 'n1nsun6laz0c6345rs8e71kmq7r0ho',
      Accept: 'application/vnd.twitchtv.v5+json',
    },
  },
  (error, response, body) => {
    if (error || response.statusCode >= 400) {
      console.error(error);
      return;
    }
    JSON.parse(body).top.forEach((game) => {
      console.log(`${game.viewers} ${game.game.name}`);
    });
  },
);
