/* eslint-disable no-alert */
const apiUrl = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery';
const errorMessage = '系統不穩定，請再試一次';
const prizes = {
  FIRST: {
    className: 'prize-first',
    title: '恭喜你中頭獎了！日本東京來回雙人遊！',
  },
  SECOND: {
    className: 'prize-second',
    title: '二獎！90 吋電視一台！',
  },
  THIRD: {
    className: 'prize-third',
    title: '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！',
  },
  NONE: {
    className: 'prize-none',
    title: '銘謝惠顧',
  },
};

function request(callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', apiUrl, true);
  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 400) {
      let data;
      try {
        data = JSON.parse(xhr.response);
      } catch (err) {
        callback(errorMessage);
        console.log(err);
        return;
      }
      if (!data.prize) {
        callback(errorMessage);
        return;
      }
      callback(null, data);
    } else {
      callback(errorMessage);
    }
  };
  xhr.onerror = () => {
    callback(errorMessage);
  };
  xhr.send();
}

document.querySelector('.luckyDraw .button').addEventListener('click', () => {
  request((err, data) => {
    if (err) {
      alert(err);
      return;
    }
    const { className, title } = prizes[data.prize];
    // const className = prizes[data.prize].className;
    // const title = prizes[data.prize].title;

    document.querySelector('.luckyDraw').classList.add(className);
    document.querySelector('.result__title').innerText = title;
    document.querySelector('.info').classList.add('d-none');
    document.querySelector('.result').classList.remove('d-none');
  });
});

document.querySelector('.result__btn').addEventListener('click', () => {
  window.location.reload();
});
