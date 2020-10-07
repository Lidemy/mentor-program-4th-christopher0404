/* eslint-disable no-undef */
/* eslint-disable no-alert */

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function datetimeFormat(datetime) {
  return datetime < 10 ? `0${datetime}` : datetime;
}

const d = new Date($.now());
const currentDatetime = `${d.getFullYear()}-${datetimeFormat(d.getMonth() + 1)}-${datetimeFormat(d.getDate())} ${datetimeFormat(d.getHours())}:${datetimeFormat(d.getMinutes())}:${datetimeFormat(d.getSeconds())}`;

const baseUrl = 'http://mentor-program.co/mtr04group2/Christopher/week12/hw1/';
const siteKey = '001';
let lastId = null;
let isEnd = false;

function appendCommentsToDOM(container, comment, isPrepend) {
  const card = `
    <div class="card bg-dark mb-2">
      <h5 class="card-header">${escapeHtml(comment.nickname)}</h5>
      <div class="card-body">
        <p class="card-text">${escapeHtml(comment.content)}</p>
        <p class="card-text">
          <small class="text-muted">${escapeHtml(comment.created_at)}</small>
        </p>
      </div>
    </div>
  `;
  if (isPrepend) {
    container.prepend(card);
  } else {
    container.append(card);
  }
}

function getCommentsAPI(key, before, callback) {
  let url = `${baseUrl}api_comments.php?site_key=${key}`;
  if (before) { url += `&before=${before}`; }

  $.ajax({
    url,
  }).done((data) => {
    callback(data);
  });
}

function getComments() {
  if (isEnd) {
    $('#load-more').hide();
    return;
  }

  getCommentsAPI(siteKey, lastId, (data) => {
    if (!data.ok) {
      alert(data.message);
      return;
    }

    const comments = data.discussions;
    // eslint-disable-next-line no-restricted-syntax
    for (const comment of comments) {
      appendCommentsToDOM($('.comments'), comment);
    }

    if (comments.length < 5) {
      isEnd = true;
      $('#load-more').hide();
    } else {
      lastId = comments[comments.length - 1].id;
    }
  });
}

getComments();

$('#load-more').on('click', () => {
  getComments();
});

$('#add-comment-form').submit((e) => {
  e.preventDefault();
  const newCommetData = {
    site_key: siteKey,
    nickname: $('input[name="nickname"]').val(),
    content: $('textarea[name="content"]').val(),
    created_at: currentDatetime,
  };

  $.ajax({
    type: 'POST',
    url: `${baseUrl}api_add_comments.php`,
    data: newCommetData,
  }).done((data) => {
    if (!data.ok) {
      alert(data.message);
      return;
    }
    $('input[name="nickname"]').val('');
    $('textarea[name="content"]').val('');
    appendCommentsToDOM($('.comments'), newCommetData, true);
  });
});
