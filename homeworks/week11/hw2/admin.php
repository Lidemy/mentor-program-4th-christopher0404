<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  require_once('check_permission.php');

  $sql = "SELECT `P`.`id` AS `id`, `P`.`title` AS `title`, `P`.`content` AS `content`, `P`.`created_at` AS `created_at`, `U`.`username` AS `username` FROM `Christopher_blog_posts` AS `P` LEFT JOIN `Christopher_blog_users` AS `U` ON `P`.`username` = `U`.`username`WHERE `P`.`is_deleted` = 0 ORDER BY `P`.`id` DESC";

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
  <title>My Posts - Christopher's Blog</title>
</head>

<body class="body admin">
  <?php include_once('./templates/navbar.php'); ?>

  <main class="main">
    <div class="container">
      <?php while ($row = $result->fetch_assoc()) { ?>

        <article class="article">
          <a href="update_post.php?id=<?php echo escape($row['id']); ?>">
            <h2 class="article__title"><?php echo escape($row['title']); ?></h2>
          </a>
          <time class="article__time"><?php echo date_format(date_create(escape($row['created_at'])), 'M j, Y'); ?></time>

          <div class="article__operation">
            <a href="handlers/handle_delete_post.php?id=<?php echo escape($row['id']); ?>" class="icon" title="Delete post">
              <svg width="300" height="300" viewBox="0 0 512 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g><path d="M202.852,385.081c5.523,0,10-4.478,10-10V252c0-5.522-4.477-10-10-10s-10,4.478-10,10v123.081   C192.852,380.604,197.329,385.081,202.852,385.081z"></path><path d="M314.743,385.081c5.523,0,10-4.478,10-10V252c0-5.522-4.477-10-10-10s-10,4.478-10,10v123.081   C304.743,380.604,309.22,385.081,314.743,385.081z"></path><path d="M69.771,125.946v54c0,5.522,4.477,10,10,10h29.162V427c0,27.57,22.43,50,50,50h194.135c27.57,0,50-22.43,50-50V189.946   h29.162c5.523,0,10-4.478,10-10v-54c0-22.056-17.944-40-40-40h-77.486V75c0-22.056-17.944-40-40-40h-57.486   c-22.056,0-40,17.944-40,40v10.946h-77.486C87.714,85.946,69.771,103.891,69.771,125.946z M383.067,427c0,16.542-13.458,30-30,30   H158.933c-16.542,0-30-13.458-30-30V189.946h254.135V427z M207.257,75c0-11.028,8.972-20,20-20h57.486c11.028,0,20,8.972,20,20   v10.946h-97.486V75z M89.771,125.946c0-11.028,8.972-20,20-20h77.486h20h97.486h20h77.486c11.028,0,20,8.972,20,20v44H89.771   V125.946z"></path></g></svg>
            </a>
          </div>
        </article>

      <?php } ?>
    </div>
  </main>

  <?php include_once('./templates/footer.php'); ?>
</body>
</html>
