<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $sql = "SELECT `P`.`id` AS `id`, `P`.`title` AS `title`, `P`.`content` AS `content`, `P`.`created_at` AS `created_at`, `U`.`username` AS `username` FROM `Christopher_blog_posts` AS `P` LEFT JOIN `Christopher_blog_users` AS `U` ON `P`.`username` = `U`.`username` WHERE `P`.`is_deleted` = 0 ORDER BY `P`.`id` DESC";

  $stmt = $conn->prepare($sql);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }

  $result = $stmt->get_result();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <?php include_once('./templates/head.php'); ?>
  <title>Articles - Christopher's Blog</title>
</head>

<body class="body">
  <?php include_once('./templates/navbar.php'); ?>

  <main class="main">
    <div class="container">
      <?php while ($row = $result->fetch_assoc()) { ?>

        <article class="article">
          <a href="post.php?id=<?php echo escape($row['id']); ?>">
            <h2 class="article__title"><?php echo escape($row['title']); ?></h2>
          </a>
          <time class="article__time"><?php echo date_format(date_create(escape($row['created_at'])), 'M j, Y'); ?></time>
          <p class="article__content"><?php echo substr(escape($row['content']), 0, 160); ?> ...</p>
        </article>

      <?php } ?>
    </div>
  </main>

  <?php include_once('./templates/footer.php'); ?>
</body>
</html>
