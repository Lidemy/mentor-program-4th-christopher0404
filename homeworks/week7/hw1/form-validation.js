/* eslint-disable no-restricted-syntax */
/* eslint-disable no-alert */

function getObjectKeyValue(obj) {
  let result = '';
  for (const [key, value] of Object.entries(obj)) {
    result += `${key}：${value} \n`;
  }
  return result;
}

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const inputResults = {};
  let hasError = false;

  const requiredInputs = document.querySelectorAll('.required .form__input');
  requiredInputs.forEach((item) => {
    if (item.value) {
      item.parentNode.classList.remove('invalid');
      inputResults[item.name] = item.value;
    } else {
      item.parentNode.classList.add('invalid');
      hasError = true;
    }
  });

  const requiredRadios = document.querySelectorAll('.required .radio-box');
  const checkedRadio = document.querySelector('.required input[type="radio"]:checked');
  requiredRadios.forEach((item) => {
    if (checkedRadio) {
      item.parentNode.classList.remove('invalid');
      inputResults[checkedRadio.name] = checkedRadio.value;
    } else {
      item.parentNode.classList.add('invalid');
      hasError = true;
    }
  });

  if (!hasError) {
    alert(getObjectKeyValue(inputResults));
  }
});
