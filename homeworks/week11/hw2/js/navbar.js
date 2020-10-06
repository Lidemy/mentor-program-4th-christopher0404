const navAvatar = document.querySelector('.nav__avatar');
if (navAvatar) {
  navAvatar.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.nav__popover').classList.toggle('invisible');
  });
}
