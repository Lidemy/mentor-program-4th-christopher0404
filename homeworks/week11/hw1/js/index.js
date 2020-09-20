const currentPage = document.querySelector('#currentPage').innerText;
const pageItems = document.querySelectorAll('.page__item');
pageItems.forEach((page) => {
  if (page.innerText === currentPage) {
    page.classList.add('page__item--active');
  }
});
