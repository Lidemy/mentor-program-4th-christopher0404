const mediaTitle = document.querySelector('.media__title');
const liveStreams = document.querySelector('.streams');
const streamTemplate = `
  <article class="stream">
    <div class="stream__data">
      <div class="stream__intro">
        <h3 class="stream__title">
          <a href="$url" target="_blank" rel="noopener noreferrer">$title</a>
        </h3>
        <h4 class="stream__channel">
          <a href="$url" target="_blank" rel="noopener noreferrer">$channel</a>
        </h4>
      </div>
      <div class="stream__logo">
      <a href="$url" target="_blank" rel="noopener noreferrer">
          <img src="$logo" alt="$channel">
        </a>
      </div>
    </div>
    <a href="$url" target="_blank" rel="noopener noreferrer">
      <div class="stream__preview">
        <img src="$preview" alt="$title">
        <div class="stream__viewers">
          <p>$viewers viewers</p>
        </div>
      </div>
    </a>
  </article>`;

const apiUrl = 'https://api.twitch.tv/kraken';
const gamesLimit = 5;
const streamsLimit = 20;
let offset = 20;

const requestOptions = {
  method: 'GET',
  headers: {
    Accept: 'application/vnd.twitchtv.v5+json',
    'Client-ID': 'n1nsun6laz0c6345rs8e71kmq7r0ho',
  },
};

function getGames() {
  return fetch(`${apiUrl}/games/top?limit=${gamesLimit}`, requestOptions)
    .then(response => response.json())
    .catch(err => console.error(err));
}

function renderGames(games) {
  const topGames = games.top.map(item => item.game.name);
  topGames.forEach((game) => {
    const navOption = `<option value="${game}">${game}</option>`;
    document.querySelector('.nav__select').insertAdjacentHTML('beforeend', navOption);
  });
  return topGames[0];
}

function getStreams(name) {
  return fetch(`${apiUrl}/streams?game=${encodeURIComponent(name)}&limit=${streamsLimit}&offset=${offset}`, requestOptions)
    .then(response => response.json())
    .catch(err => console.error(err));
}

function renderStreams(streams) {
  streams.streams.forEach((stream) => {
    const template = streamTemplate
      .replace(/\$url/g, stream.channel.url)
      .replace(/\$title/g, stream.channel.status)
      .replace(/\$channel/g, stream.channel.name)
      .replace('$logo', stream.channel.logo)
      .replace('$preview', stream.preview.large)
      .replace('$viewers', stream.viewers);
    liveStreams.insertAdjacentHTML('beforeend', template);
    mediaTitle.innerText = stream.game;
  });
}

async function initialRender() {
  const topGamesList = await getGames();
  const topGame = renderGames(topGamesList);
  const topGameStreams = await getStreams(topGame);
  renderStreams(topGameStreams);
}

initialRender();

async function reRender(game) {
  const streams = await getStreams(game);
  renderStreams(streams);
}

document.querySelector('.nav__select').addEventListener('change', (e) => {
  const optionValue = e.target.value;
  mediaTitle.innerText = optionValue;
  liveStreams.innerHTML = '';
  reRender(optionValue);
});

document.querySelector('.media__button').addEventListener('click', () => {
  offset += 20;
  reRender(mediaTitle.innerText);
});

document.querySelector('.theme-toggler').addEventListener('click', (e) => {
  e.preventDefault();
  document.body.classList.toggle('theme--light');
  document.body.classList.toggle('theme--dark');
  document.querySelector('.header').classList.toggle('bg--dark');
});
