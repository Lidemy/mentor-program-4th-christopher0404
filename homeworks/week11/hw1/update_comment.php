<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $id = $_GET['id'];
  $username = NULL;
  $user = NULL;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
  }

  $sql = "SELECT * FROM `Christopher_board_comments` WHERE `id` = ? and `username` = ?";
  if (isAdmin($user) || isEditor($user)) {
    $sql = "SELECT * FROM `Christopher_board_comments` WHERE `id` = ?";
  }

  $stmt = $conn->prepare($sql);

  if (isAdmin($user) || isEditor($user)) {
    $stmt->bind_param('i', $id);
  } else {
    $stmt->bind_param('is', $id, $username);
  }

  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }

  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
?>

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

      <?php if (!$username) { ?>

        <li class="nav__item">
          <a href="register.php" class="nav__link">Sign Up</a>
        </li>
        <li class="nav__item">
          <a href="login.php" class="nav__link">Log In</a>
        </li>

      <?php } else { ?>

        <li class="nav__item nav__username">
          <?php echo 'Hi, ' . $username ?>
        </li>
        <li class="nav__item">
          <a href="logout.php" class="nav__link">Log out</a>
        </li>

      <?php } ?>
    </ul>
  </nav>

  <main class="main">
    <form id="updateComment" action="handle_update_comment.php" method="POST" class="form">

      <?php
        if (!empty($_GET['errCode'])) {
          $code = $_GET['errCode'];
          $msg = 'Error';
          if ($code === '1') {
            $msg = '資料不齊全';
          }
          echo '<p class="error-message">錯誤：' . $msg . '</p>';
        }
      ?>

      <textarea name="content" form="updateComment" rows="2" minlength="1" maxlength="256" class="form__textarea" required><?php echo escape($row['content']); ?></textarea>
      <input type="hidden" name="id" value="<?php echo escape($row['id']); ?>" />

      <div class="form__footer">
        <input type="text" name="nickname" minlength="1" maxlength="24" value="<?php echo escape($user['nickname']); ?>" class="form__input form__nickname" disabled>
        <button type="submit" form="updateComment" class="btn btn-primary">Send</button>
      </div>
    </form>
  </main>
</body>
</html>
