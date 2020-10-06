<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <?php include_once('./templates/head.php'); ?>
  <title>Login | Christopher's Blog</title>
</head>

<body class="body">
  <?php include_once('./templates/navbar.php'); ?>

  <main class="main">
    <div class="container">
      <form action="handlers/handle_login.php" method="POST" class="form">

        <div class="form__group">
          <label for="username" class="form__label">Username</label>
          <input type="text" name="username" id="username" class="form__input" minlength="1" maxlength="24" pattern="^[A-Za-z0-9_]{1,24}$" required>
        </div>

        <div class="form__group">
          <label for="password" class="form__label">Password</label>
          <input type="password" name="password" id="password" class="form__input" minlength="1" maxlength="24" pattern="^[A-Za-z0-9_]{1,24}$" required>
        </div>

        <?php
          if (!empty($_GET['errCode'])) {
            $code = $_GET['errCode'];
            $msg = 'Error';
            if ($code === '1') {
              $msg = 'Incomplete input';
            } else if ($code === '2') {
              $msg = 'Incorrect username or password';
            }
            echo "<p class='text-warning'>$msg</p>";
          }
        ?>

        <div class="form__submit">
          <button type="submit" class="btn btn-primary w-100">Log In</button>
        </div>
      </form>
    </div>
  </main>

  <?php include_once('./templates/footer.php'); ?>
</body>
</html>
