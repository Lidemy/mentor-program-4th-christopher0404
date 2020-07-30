const request = require('request');

const url = 'https://lidemy-book-store.herokuapp.com';

request(`${url}/books?_limit=10`, (error, response, body) => {
  if (error || response.statusCode >= 400) {
    console.error(error);
    return;
  }
  const data = JSON.parse(body);
  data.forEach(book => console.log(`${book.id} ${book.name}`));
});
