document.querySelector('.faq__list').addEventListener('click', (e) => {
  const accordionHeader = e.target.closest('.accordion__header');
  if (accordionHeader) {
    accordionHeader.parentNode.classList.toggle('accordion--hidden');
  }
});
