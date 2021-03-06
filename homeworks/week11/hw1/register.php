<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Christopher's Message Board</title>
  <link rel="stylesheet" href="style/main.css">
</head>

<body class="body">
  <nav class="nav">
    <ul class="nav__list">
      <li class="nav__item">
        <a href="index.php" class="nav__link">Home</a>
      </li>
      <li class="nav__item">
        <a href="register.php" class="nav__link">Sign Up</a>
      </li>
      <li class="nav__item">
        <a href="login.php" class="nav__link">Log In</a>
      </li>
    </ul>
  </nav>

  <main class="main">
    <form action="handle_register.php" method="POST" class="form">

      <?php
        if (!empty($_GET['errCode'])) {
          $code = $_GET['errCode'];
          $msg = 'Error';
          if ($code === '1') {
            $msg = '資料不齊全';
            echo '<p class="error-message">錯誤：' . $msg . '</p>';
          }
        }
      ?>

      <div class="form__group">
        <label for="nickname" class="form__label">Nickname</label>
        <input type="text" name="nickname" id="nickname" class="form__input" minlength="1" maxlength="24" pattern="^[\S].{0,22}[\S]$" placeholder="e.g. huli" required>
      </div>

      <div class="form__group">
        <label for="username" class="form__label">Username</label>
        <input type="text" name="username" id="username" class="form__input" minlength="1" maxlength="24" pattern="^[A-Za-z0-9_]{1,24}$" placeholder="e.g. aszx87410" required>

        <?php
          if (!empty($_GET['errCode'])) {
            $code = $_GET['errCode'];
            $msg = 'Error';
            if ($code === '2') {
              $msg = '使用者名稱已被註冊';
              echo '<p class="error-message">' . $msg . '</p>';
            }
          }
        ?>
      </div>

      <div class="form__group">
        <label for="password" class="form__label">Password</label>
        <input type="password" name="password" id="password" class="form__input" minlength="1" maxlength="24" pattern="^[A-Za-z0-9_]{1,24}$" placeholder="e.g. Huli_87410" required>
      </div>

      <button type="submit" class="btn btn-primary form__submit">Sign Up</button>
    </form>
  </main>
</body>
</html>
