<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $id = intval($_GET['id']);

  $sql = "SELECT `P`.`id` AS `id`, `P`.`title` AS `title`, `P`.`content` AS `content`, `P`.`created_at` AS `created_at`, `U`.`username` AS `username` FROM `Christopher_blog_posts` AS `P` LEFT JOIN `Christopher_blog_users` AS `U` ON `P`.`username` = `U`.`username` WHERE `P`.`id` = ?";

  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);
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
  <?php include_once('./templates/head.php'); ?>
  <title><?php echo escape($row['title']); ?> - Christopher's Blog</title>
</head>

<body class="body single-post">
  <?php include_once('./templates/navbar.php'); ?>

  <main class="main">
    <div class="container">
      <article class="article">
        <h1 class="article__title"><?php echo escape($row['title']); ?></h1>
        <time class="article__time"><?php echo date_format(date_create(escape($row['created_at'])), 'M j, Y'); ?></time>
        <p class="article__content"><?php echo escape($row['content']); ?></p>
      </article>
    </div>
  </main>

  <?php include_once('./templates/footer.php'); ?>
</body>
</html>
