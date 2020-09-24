<?php
  session_start();
  require_once('../conn.php');
  require_once('../utils.php');

  $username = $_SESSION['username'];
  $title = $_POST['title'];
  $content = $_POST['content'];

  if (empty($title) || empty($content)) {
    header('Location: ../create_post.php?errCode=1');
    die('資料不齊全');
  }

  $sql = "INSERT INTO `Christopher_blog_posts`(`is_published`, `username`, `title`, `content`) VALUES (1, ?, ?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sss', $username, $title, $content);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }

  header("Location: ../admin.php");
?>
