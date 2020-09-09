<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  /*
    1. 從 Cookie 裡面讀取 PHPSESSID (token)
    2. 從檔案裡面讀取 PHPSESSID 的內容
    3. 放到 $_SESSION
  */
  $username = NULL;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  }

  $stmt = $conn->prepare("SELECT * FROM `Christopher_board_comments` ORDER BY id DESC");
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }
  $result = $stmt->get_result();
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
    <form action="handle_add_comment.php" method="POST" class="form">

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

      <textarea name="content" rows="2" maxlength="256" placeholder="Type something here" class="form__textarea"></textarea>

      <div class="form__footer">
        <?php if ($username) { ?>

          <input type="text" name="nickname" maxlength="32" value="<?php echo getUserFromUsername($_SESSION['username'])['nickname']; ?>" class="form__input form__nickname" disabled>
          <button type="submit" class="btn btn-primary">Send</button>

        <?php } else { ?>

          <input type="text" name="nickname" maxlength="32" placeholder="Log in to leave a message" class="form__input form__nickname" disabled>
          <button type="submit" class="btn btn--disabled" disabled>Send</button>

        <?php } ?>
      </div>
    </form>

    <section class="messages">
      <?php while ($row = $result->fetch_assoc()) { ?>

        <div class="message">
          <div class="message__avatar"></div>
          <div class="message__body">

            <div class="message__info">
              <p class="message__author">
                <?php echo escape($row['nickname']); ?>
              </p>
              <time class="message__time">
                <?php echo escape($row['created_at']); ?>
              </time>
            </div>

            <p class="message__content"><?php echo escape($row['content']); ?></p>
          </div>
        </div>

      <?php } ?>
    </section>
  </main>
</body>
</html>
