const request = require('request');
// const process = require('process');

const url = 'https://lidemy-book-store.herokuapp.com/books';
const method = process.argv[2];
const param = process.argv[3];
const bookName = process.argv[4];

function listBooks() {
  request(`${url}?_limit=20`, (error, response, body) => {
    if (error || response.statusCode >= 400) {
      console.error(error);
      return;
    }
    JSON.parse(body).forEach((book) => {
      console.log(`${book.id} ${book.name}`);
    });
  });
}

function readBook(id) {
  request(`${url}/${id}`, (error, response, body) => {
    if (error || response.statusCode >= 400) {
      console.error(error);
      return;
    }
    console.log(JSON.parse(body).name);
  });
}

function deleteBook(id) {
  request.delete(`${url}/${id}`, (error, response) => {
    if (error || response.statusCode >= 400) {
      console.error(error);
      return;
    }
    console.log(`The book id ${id} has been deleted.`);
  });
}

function createBook(name) {
  request.post(
    {
      url: `${url}`,
      form: { name },
    },
    (error, response) => {
      if (error || response.statusCode >= 400) {
        console.error(error);
        return;
      }
      console.log(`The book named "${name}" has been created.`);
    },
  );
}

function updateBook(id, name) {
  request.patch(
    {
      url: `${url}/${id}`,
      form: { name },
    },
    (error, response) => {
      if (error || response.statusCode >= 400) {
        console.error(error);
        return;
      }
      console.log(`The book id ${id} has been renamed to "${name}".`);
    },
  );
}

switch (method) {
  case 'list':
    listBooks();
    break;
  case 'read':
    readBook(param);
    break;
  case 'delete':
    deleteBook(param);
    break;
  case 'create':
    createBook(param);
    break;
  case 'update':
    updateBook(param, bookName);
    break;
  default:
    console.error('Available commands: list, read, delete, create and update.');
}
