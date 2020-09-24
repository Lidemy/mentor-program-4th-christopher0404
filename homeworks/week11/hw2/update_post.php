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
      <form action="handlers/handle_update_post.php" method="POST" class="post">
        <input type="text" name="title" class="post__title" maxlength="128" value="<?php echo escape($row['title']); ?>">
        <textarea name="content" rows="20" class="post__content"><?php echo escape($row['content']); ?></textarea>
        <button type="submit" class="btn btn-primary">Save</button>
        <input type="hidden" name="id" value="<?php echo escape($row['id']); ?>">
        <input type="hidden" name="previous_url" value="<?php echo $_SERVER['HTTP_REFERER']; ?>">
      </form>
    </div>
  </main>

  <?php include_once('./templates/footer.php'); ?>
</body>
</html>
