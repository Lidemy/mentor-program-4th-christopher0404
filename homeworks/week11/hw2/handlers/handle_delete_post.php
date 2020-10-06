<?php
  session_start();
  require_once('../conn.php');
  require_once('../utils.php');
  require_once('../check_permission.php');

  $id = $_GET['id'];

  if (empty($id)) {
    header('Location: ../index.php?errCode=1');
    die('資料不齊全');
  }

  $sql = "UPDATE `Christopher_blog_posts` SET `is_deleted` = 1 WHERE `id` = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }

  header("Location: ../admin.php");
?>
