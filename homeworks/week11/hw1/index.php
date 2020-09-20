<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $username = NULL;
  $user = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
  }

  $page = 1;
  if (!empty($_GET['page'])) {
    $page = intval($_GET['page']);
  }
  $items_per_page = 10;
  $offset = ($page - 1) * $items_per_page;

  $sql = "SELECT `C`.`id` AS `id`, `C`.`content` AS `content`, `C`.`created_at` AS `created_at`, `U`.`nickname` AS `nickname`, `U`.`username` AS `username` FROM `Christopher_board_comments` AS `C` LEFT JOIN `Christopher_board_users` AS `U` ON `C`.`username` = `U`.`username` WHERE `C`.`is_deleted` IS NULL ORDER BY `C`.`id` DESC LIMIT ? OFFSET ?";

  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ii', $items_per_page, $offset);
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
  <script src="js/index.js" defer></script>
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
          <?php echo "Hi, {$username}" ?>
        </li>

        <?php if ($user['role'] === 'admin') { ?>
          <li class="nav__item">
            <a href="admin.php" class="nav__link">Manage roles</a>
          </li>
        <?php } ?>

        <li class="nav__item">
          <a href="logout.php" class="nav__link">Log out</a>
        </li>

      <?php } ?>
    </ul>
  </nav>

  <main class="main">
    <form id="updateUser" action="update_user.php" method="POST"></form>
    <form id="addComment" action="handle_add_comment.php" method="POST" class="form">

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

      <?php if ($username && !hasPermission($user, 'create', NULL)) { ?>

        <textarea rows="2" placeholder="You don't have permission to leave a message" class="form__textarea" disabled></textarea>
        <div class="form__footer">
          <input type="text" name="nickname" form="updateUser" minlength="1" maxlength="24" pattern="^[\S].{0,22}[\S]$" value="<?php echo $user['nickname']; ?>" class="form__input form__nickname">
          <button type="submit" form="updateUser" class="btn">Save</button>
          <button type="submit" class="btn btn--disabled" disabled>Send</button>
        </div>

      <?php } else if ($username) { ?>

        <textarea name="content" form="addComment" rows="2" minlength="1" maxlength="256" placeholder="Type something here" class="form__textarea" required></textarea>
        <div class="form__footer">
          <input type="text" name="nickname" form="updateUser" minlength="1" maxlength="24" pattern="^[\S].{0,22}[\S]$" value="<?php echo $user['nickname']; ?>" class="form__input form__nickname">
          <button type="submit" form="updateUser" class="btn">Save</button>
          <button type="submit" form="addComment" class="btn btn-primary">Send</button>
        </div>

      <?php } else { ?>

        <textarea rows="2" placeholder="Log in to leave a message" class="form__textarea" disabled></textarea>
        <div class="form__footer">
          <input type="text" class="form__input form__nickname" disabled>
          <button type="submit" class="btn btn--disabled" disabled>Send</button>
        </div>

      <?php } ?>
    </form>

    <section class="messages">
      <?php while ($row = $result->fetch_assoc()) { ?>

        <div class="message">
          <div class="message__avatar"></div>
          <div class="message__body">

            <div class="message__info">
              <p class="message__author">
                <?php echo escape($row['nickname']); ?>
                <!-- (@<?php echo escape($row['username']); ?>) -->
              </p>
              <time class="message__time">
                <?php echo escape($row['created_at']); ?>
              </time>
            </div>
            <p class="message__content"><?php echo escape($row['content']); ?></p>

            <div class="message__operation">
              <?php if (hasPermission($user, 'update', $row)) { ?>
                <a href="update_comment.php?id=<?php echo escape($row['id']); ?>" class="icon" title="Edit message">
                  <svg height="300" width="300" viewBox="0 0 56 56" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M50.5356445,18.4611816c2.2226562-2.2226562,2.2226562-5.8393555,0-8.0620117l-4.9345703-4.9350586  c-2.2226562-2.2226562-5.8398438-2.2226562-8.0625,0L8.4887695,34.513916L3.7973633,52.2028809l17.6884766-4.6918945  L50.5356445,18.4611816z M10.7956543,35.0351562l22.1616211-22.1616211l10.1687012,10.1691895L20.9643555,45.2043457  L10.7956543,35.0351562z M38.9526367,6.8781738c1.4433594-1.4423828,3.7910156-1.4423828,5.234375,0l4.9345703,4.9350586  c1.4428711,1.4428711,1.4428711,3.7910156,0,5.2338867l-4.581543,4.581543L34.3713379,11.4594727L38.9526367,6.8781738z   M9.9055176,36.9732056l9.1207886,9.1211548L6.6137695,49.3864746L9.9055176,36.9732056z"></path></svg>
                </a>
              <?php } ?>

              <?php if (hasPermission($user, 'delete', $row)) { ?>
                <a href="delete_comment.php?id=<?php echo escape($row['id']); ?>" class="icon" title="Delete message">
                  <svg width="300" height="300" viewBox="0 0 512 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g><path d="M202.852,385.081c5.523,0,10-4.478,10-10V252c0-5.522-4.477-10-10-10s-10,4.478-10,10v123.081   C192.852,380.604,197.329,385.081,202.852,385.081z"></path><path d="M314.743,385.081c5.523,0,10-4.478,10-10V252c0-5.522-4.477-10-10-10s-10,4.478-10,10v123.081   C304.743,380.604,309.22,385.081,314.743,385.081z"></path><path d="M69.771,125.946v54c0,5.522,4.477,10,10,10h29.162V427c0,27.57,22.43,50,50,50h194.135c27.57,0,50-22.43,50-50V189.946   h29.162c5.523,0,10-4.478,10-10v-54c0-22.056-17.944-40-40-40h-77.486V75c0-22.056-17.944-40-40-40h-57.486   c-22.056,0-40,17.944-40,40v10.946h-77.486C87.714,85.946,69.771,103.891,69.771,125.946z M383.067,427c0,16.542-13.458,30-30,30   H158.933c-16.542,0-30-13.458-30-30V189.946h254.135V427z M207.257,75c0-11.028,8.972-20,20-20h57.486c11.028,0,20,8.972,20,20   v10.946h-97.486V75z M89.771,125.946c0-11.028,8.972-20,20-20h77.486h20h97.486h20h77.486c11.028,0,20,8.972,20,20v44H89.771   V125.946z"></path></g></svg>
                </a>
              <?php } ?>
            </div>
          </div>
        </div>

      <?php } ?>
    </section>

    <div class="pagination">
      <?php
        $stmt = $conn->prepare("SELECT count(id) AS `count` FROM `Christopher_board_comments` WHERE `is_deleted` IS NULL");
        $result = $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        $count = $row['count'];
        $total_page = ceil($count / $items_per_page);
      ?>

      <div class="pagination__info">
        <p>
          <span id="numOfMessages"><?php echo $count ?></span>
          <span>messages</span>
        </p>
        <p>
          <span id="currentPage"><?php echo $page ?></span>
          <span>of</span>
          <span id="totalPages"><?php echo $total_page ?></span>
        </p>
      </div>

      <nav aria-label="pagination">
        <ul class="page">
          <?php if ($page == 1) { ?>
            <li class="page__item page__item--disabled" title="First Page">
              <a class="page__link">|&lt;</a>
            </li>
            <li class="page__item page__item--disabled" title="Previous Page">
              <a class="page__link">&lt;</a>
            </li>
          <?php } else { ?>
            <li class="page__item" title="First Page">
              <a href="index.php?page=1" class="page__link">|&lt;</a>
            </li>
            <li class="page__item" title="Previous Page">
              <a href="index.php?page=<?php echo $page - 1 ?>" class="page__link">&lt;</a>
            </li>
          <?php } ?>

          <?php for($i = 1; $i <= $total_page; $i += 1) { ?>
            <li class="page__item" title="Page <?php echo $i ?>">
              <a href="index.php?page=<?php echo $i ?>" class="page__link">
                <?php echo $i ?>
              </a>
            </li>
          <?php } ?>

          <?php if ($page == $total_page) { ?>
            <li class="page__item page__item--disabled" title="Next Page">
              <a class="page__link">&gt;</a>
            </li>
            <li class="page__item page__item--disabled" title="Last Page">
              <a class="page__link">&gt;|</a>
            </li>
          <?php } else { ?>
            <li class="page__item" title="Next Page">
              <a href="index.php?page=<?php echo $page + 1 ?>" class="page__link">&gt;</a>
            </li>
            <li class="page__item" title="Last Page">
              <a href="index.php?page=<?php echo $total_page ?>" class="page__link">&gt;|</a>
            </li>
          <?php } ?>
        </ul>
      </nav>
    </div>

  </main>
</body>
</html>
