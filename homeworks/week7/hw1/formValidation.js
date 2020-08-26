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
  let hasError = false;
  const inputResults = {};
  const requiredItems = document.querySelectorAll('.required');
  let item;

  for (item of requiredItems) {
    const requiredRadios = item.querySelectorAll('input[type="radio"]');
    const requiredInput = item.querySelector('.form__input');
    let isValid = true;

    if (requiredInput) {
      inputResults[requiredInput.name] = requiredInput.value;
      if (!requiredInput.value) {
        isValid = false;
      }
    } else if (requiredRadios.length) {
      isValid = [...requiredRadios].some(radio => radio.checked);
      if (isValid) {
        const checkedRadio = item.querySelector('input[type=radio]:checked');
        inputResults[checkedRadio.name] = checkedRadio.value;
      }
    }

    if (!isValid) {
      item.classList.add('invalid');
      hasError = true;
    } else {
      item.classList.remove('invalid');
    }
  }

  if (!hasError) {
    // alert(JSON.stringify(inputResults));
    alert(getObjectKeyValue(inputResults));
  }
});
