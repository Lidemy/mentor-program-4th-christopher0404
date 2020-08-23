const form = document.querySelector('.form');
const formInput = document.querySelector('.form__input');
const formSubmit = document.querySelector('.form__submit');
const todoList = document.querySelector('.todo-list');

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function addTodos() {
  const inputValue = formInput.value;
  if (inputValue.trim().length === 0) return;
  const todoTemplate = `
    <li class="todo">
      <label class="todo__title">
        <input type="checkbox" class="todo__check">
        ${escapeHtml(inputValue)}
      </label>
      <button class="btn todo__delete">&times;</button>
    </li>
  `;
  todoList.insertAdjacentHTML('afterbegin', todoTemplate);
  formInput.value = '';
}

function checkTodos(event) {
  const { target } = event;
  if (target.classList.contains('todo__check') && target.checked) {
    target.parentNode.parentNode.classList.add('todo--completed');
  } else {
    target.parentNode.parentNode.classList.remove('todo--completed');
  }
}

function deleteTodos(event) {
  const { target } = event;
  if (target.classList.contains('todo__delete')) {
    target.parentNode.remove();
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addTodos();
});

formSubmit.addEventListener('click', addTodos);

todoList.addEventListener('click', (e) => {
  checkTodos(e);
  deleteTodos(e);
});
