const forms = document.querySelectorAll('form[action="handle_update_role.php"]');
forms.forEach((form) => {
  const roleOptions = form.querySelectorAll('option');
  const userRole = form.querySelector('.user-role');

  roleOptions.forEach((option) => {
    if (option.value === userRole.innerText) {
      // eslint-disable-next-line no-param-reassign
      option.selected = true;
    }
  });
});
