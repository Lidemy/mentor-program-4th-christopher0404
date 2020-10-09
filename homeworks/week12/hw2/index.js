/* eslint-disable no-undef */

const baseUrl = 'http://mentor-program.co/mtr04group2/Christopher/week12/hw2/';
const searchParams = new URLSearchParams(window.location.search);
const paramId = searchParams.get('id');

let todoId = 1;
let todoCount = 0;
let completedTodoCount = 0;
let todosData = [];

const todoTemplate = `
  <li class="todo">
    <div class="todo__item">
      <input type="checkbox" id="todo-{{ id }}" class="todo__checkbox border-primary">
      <input class="todo__name" value="{{ content }}" maxlength="32"></input>
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
  $('#completed-todos').text(completedTodoCount);
  $('#all-todos').text(todoCount);
}

function render() {
  todoCount = todosData.length;
  completedTodoCount = todosData.filter(todo => todo.isCompleted).length;
  updateCounter();
  $('.todos-list').empty();

  if (todosData.length === 0) return;
  todoId = Number(todosData[todosData.length - 1].id) + 1;

  todosData.forEach((todo) => {
    const template = todoTemplate
      .replace(/{{ id }}/g, todo.id)
      .replace(/{{ content }}/g, escapeHTML(todo.content));

    $('.todos-list').append(template);

    if (todo.isCompleted) {
      $(`#todo-${todo.id}`).prop('checked', true);
      $(`#todo-${todo.id}`).parents('.todo').addClass('todo--completed');
    }
  });
}

if (paramId) {
  $.getJSON(`${baseUrl}get_todo.php?id=${paramId}`, (data) => {
    todosData = JSON.parse(data.data.todo);
    render();
  });
}

function addTodo() {
  const inputValue = $('.form__input').val();
  if (inputValue.trim().length === 0) return;

  todosData.push({
    id: todoId,
    content: inputValue,
    isCompleted: false,
  });

  render();
  $('.form__input').val('');
}

$('.form').submit((e) => {
  e.preventDefault();
  addTodo();
});

$('.form__submit').click(addTodo);

$('.todos-list').on('click', '.todo__delete', (e) => {
  const deleteId = $(e.target).parent().find('.todo__checkbox').attr('id')
    .replace('todo-', '');
  todosData = todosData.filter(todo => todo.id !== Number(deleteId));
  render();
});

$('.todos-list').on('change', '.todo__checkbox', (e) => {
  const target = $(e.target);
  const isChecked = target.is(':checked');
  const updateId = target.attr('id').replace('todo-', '');

  for (let i = 0; i < todosData.length; i += 1) {
    if (todosData[i].id === Number(updateId)) {
      todosData[i].isCompleted = isChecked;
    }
  }
  render();
});

$('#clear-completed-todos').click(() => {
  todosData = todosData.filter(todo => !todo.isCompleted);
  render();
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

$('.todos-list').on('blur', '.todo__name', (e) => {
  const target = $(e.target);
  const todoCheckboxId = target.siblings().attr('id').replace('todo-', '');

  for (let i = 0; i < todosData.length; i += 1) {
    if (todosData[i].id === Number(todoCheckboxId)) {
      todosData[i].content = target.val();
    }
  }
});

$('#save-todos').click(() => {
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
