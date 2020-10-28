import $ from 'jquery';
import { getComments, addComments } from './api';
import { getCurrentDatetime, appendCommentsToDOM } from './utils';
import { getForm, getLoadMoreButton } from './templates';

export function init(options) {
  let lastId = null;
  let isEnd = false;

  const { siteKey, apiUrl, container } = options;
  const commentsClassName = `comments-${siteKey}`;
  const formClassName = `add-comment-form-${siteKey}`;
  const formSelector = `.${formClassName}`;
  const loadMoreClassName = `load-more-${siteKey}`;

  $(container).append(getForm(formClassName, commentsClassName));
  $(container).append(getLoadMoreButton(loadMoreClassName));
  const commentDOM = $(`.${commentsClassName}`);

  function getNewComments() {
    if (isEnd) {
      $(`.${loadMoreClassName}`).hide();
      return;
    }

    getComments(apiUrl, siteKey, lastId, (data) => {
      if (!data.ok) {
        console.warn(data.message);
        return;
      }

      const comments = data.discussions;
      comments.forEach((comment) => {
        appendCommentsToDOM(commentDOM, comment);
      });

      if (comments.length < 5) {
        isEnd = true;
        $(`.${loadMoreClassName}`).hide();
      } else {
        lastId = comments[comments.length - 1].id;
      }
    });
  }

  getNewComments();

  $(container).on('click', `.${loadMoreClassName}`, () => {
    getNewComments();
  });

  $(formSelector).on('submit', (e) => {
    e.preventDefault();
    const nicknameDOM = $(`${formSelector} input[name=nickname]`);
    const contentDOM = $(`${formSelector} textarea[name=content]`);

    const newCommetData = {
      site_key: siteKey,
      nickname: nicknameDOM.val(),
      content: contentDOM.val(),
      created_at: getCurrentDatetime(),
    };

    addComments(apiUrl, newCommetData, (data) => {
      if (!data.ok) {
        console.warn(data.message);
        return;
      }
      nicknameDOM.val('');
      contentDOM.val('');
      appendCommentsToDOM(commentDOM, newCommetData, true);
    });
  });
}

export default 'init';
