<?php
  session_start();
  require_once('../conn.php');
  require_once('../utils.php');
  require_once('../check_permission.php');

  $id = intval($_POST['id']);
  $title = $_POST['title'];
  $content = $_POST['content'];
  $previousUrl = $_POST['previous_url'];

  if (empty($id) || empty($title) || empty($content)) {
    header("Location: {$previousUrl}");
    die('資料不齊全');
  }

  $sql = "UPDATE `Christopher_blog_posts` SET `title` = ?, `content` = ? WHERE `id` = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ssi', $title, $content, $id);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }

  header("Location: {$previousUrl}");
?>
