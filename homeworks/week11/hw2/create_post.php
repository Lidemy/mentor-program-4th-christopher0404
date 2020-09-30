<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  require_once('check_permission.php');
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <?php include_once('./templates/head.php'); ?>
  <title>Editing | Christopher's Blog</title>
</head>

<body class="body">
  <?php include_once('./templates/navbar.php'); ?>

  <main class="main">
    <div class="container">
      <form action="handlers/handle_create_post.php" method="POST" class="post">
        <input type="text" name="title" class="post__title" maxlength="128" placeholder="Title">
        <textarea name="content" rows="16" class="post__content" placeholder="Tell your story..."></textarea>
        <button type="submit" class="btn btn-primary">Save</button>
      </form>
    </div>
  </main>

  <?php include_once('./templates/footer.php'); ?>
</body>
</html>
