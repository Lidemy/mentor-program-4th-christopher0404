/* eslint-disable no-alert */
function encodeHTML(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function getComments() {
  const request = new XMLHttpRequest();
  request.open('GET', 'api_comments.php', true);
  request.onload = () => {
    if (this.status >= 200 && this.status < 400) {
      const json = JSON.parse(this.response);
      const comments = json.Christopher_board_comments;
      for (let i = 0; i < comments.length; i += 1) {
        const comment = comments[i];
        const messageTemplate = `
          <div class="message">
            <div class="message__avatar"></div>
            <div class="message__body">
              <div class="message__info">
                <p class="message__author">${encodeHTML(comment.nickname)} (@${comment.username})</p>
                <time class="message__time">${comment.created_at}</time>
              </div>
              <p class="message__content">${encodeHTML(comment.content)}</p>
            </div>
          </div>`;
        document.querySelector('.messages').insertAdjacentHTML('beforeend', messageTemplate);
      }
    }
  };
  request.send();
}
getComments();

document.querySelector('#addComment').addEventListener('submit', (e) => {
  e.preventDefault();
  const content = document.querySelector('textarea[name=content]').value;
  const request = new XMLHttpRequest();
  request.open('POST', 'api_add_comment.php', true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.onload = () => {
    if (this.status >= 200 && this.status < 400) {
      const json = JSON.parse(this.response);
      if (json.ok) {
        window.location.reload();
      } else {
        alert(json.message);
      }
    }
  };
  request.send(`username=Nick&content=${encodeURIComponent(content)}`);
});
