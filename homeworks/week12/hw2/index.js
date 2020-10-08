/* eslint-disable no-undef */

const baseUrl = 'http://mentor-program.co/mtr04group2/Christopher/week12/hw2/';
const searchParams = new URLSearchParams(window.location.search);
const paramId = searchParams.get('id');

let todoId = 1;
// eslint-disable-next-line no-unused-vars
let todoCount = 0;
let uncompletedTodoCount = 0;

const todoTemplate = `
  <li class="todo">
    <div class="todo__item">
      <input type="checkbox" id="todo-{{ id }}" class="todo__checkbox border-primary">
      <label for="todo-{{ id }}" class="todo__name">{{ content }}</label>
    </div>
    <button class="todo__delete btn">&times;</button>
  </li>
`;

function escapeHTML(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function updateCounter() {
  $('#uncompleted-todos').text(uncompletedTodoCount);
}

function restoreTodos(todos) {
  if (todos.length === 0) return;
  todoId = Number(todos[todos.length - 1].id) + 1;

  todos.forEach((todo) => {
    const template = todoTemplate
      .replace(/{{ id }}/g, todo.id)
      .replace(/{{ content }}/g, escapeHTML(todo.content));

    $('.todo-list').append(template);

    if (todo.isCompleted) {
      $(`#todo-${todo.id}`).prop('checked', true);
      $(`#todo-${todo.id}`).parents('.todo').addClass('todo--completed');
    } else {
      uncompletedTodoCount += 1;
    }
    updateCounter();
  });
}

if (paramId) {
  $.getJSON(`${baseUrl}get_todo.php?id=${paramId}`, (data) => {
    const todos = JSON.parse(data.data.todo);
    restoreTodos(todos);
  });
}

function addTodo() {
  const inputValue = $('.form__input').val();
  if (inputValue.trim().length === 0) return;

  const template = todoTemplate
    .replace(/{{ id }}/g, todoId)
    .replace(/{{ content }}/g, escapeHTML(inputValue));

  $('.todo-list').append(template);
  $('.form__input').val('');

  todoId += 1;
  todoCount += 1;
  uncompletedTodoCount += 1;
  updateCounter();
}

$('.form').submit((e) => {
  e.preventDefault();
  addTodo();
});

$('.form__submit').click(addTodo);

$('.todo-list').on('click', '.todo__delete', (e) => {
  const target = $(e.target);
  const isChecked = target.parent().find('.todo__checkbox').is(':checked');

  if (!isChecked) {
    uncompletedTodoCount -= 1;
  }

  updateCounter();
  todoCount -= 1;
  target.parent().remove();
});

$('.todo-list').on('change', '.todo__checkbox', (e) => {
  const target = $(e.target);
  const isChecked = target.is(':checked');

  if (isChecked) {
    target.parents('.todo').addClass('todo--completed');
    uncompletedTodoCount -= 1;
  } else {
    uncompletedTodoCount += 1;
    target.parents('.todo').removeClass('todo--completed');
  }

  updateCounter();
});

$('#clear-completed-todos').click(() => {
  todoCount -= $('.todo--completed').length;
  $('.todo--completed').remove();
});

$('#select-todos').on('change', (e) => {
  const optionValue = $(e.target).val();

  switch (optionValue) {
    case 'completed':
      $('.todo').hide();
      $('.todo--completed').show();
      break;
    case 'uncompleted':
      $('.todo').show();
      $('.todo--completed').hide();
      break;
    default:
      $('.todo').show();
  }
});

$('#save-todos').click(() => {
  const todosData = [];

  $('.todo').each((i, el) => {
    const checkbox = $(el).find('.todo__checkbox');
    const label = $(el).find('.todo__name');

    todosData.push({
      id: Number(checkbox.attr('id').replace('todo-', '')),
      content: label.text(),
      isCompleted: $(el).hasClass('todo--completed'),
    });
  });

  const data = JSON.stringify(todosData);

  $.ajax({
    type: 'POST',
    url: `${baseUrl}add_todo.php`,
    data: {
      todo: data,
    },
    success: (res) => {
      const responseId = res.id;
      window.location = `index.html?id=${responseId}`;
    },
    error: (err) => {
      console.log(err);
    },
  });
});
