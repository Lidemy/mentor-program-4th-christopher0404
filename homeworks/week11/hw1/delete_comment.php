<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  if (empty($_GET['id'])) {
    header('Location: index.php?errCode=1');
    die('資料不齊全');
  }

  $id = $_GET['id'];
  $username = $_SESSION['username'];
  $user = getUserFromUsername($username);

  if (isAdmin($user)) {
    $sql = "UPDATE `Christopher_board_comments` SET `is_deleted` = 1 WHERE `id` = ?";
  } else {
    $sql = "UPDATE `Christopher_board_comments` SET `is_deleted` = 1 WHERE `id` = ? and `username` = ?";
  }

  $stmt = $conn->prepare($sql);

  if (isAdmin($user)) {
    $stmt->bind_param('i', $id);
  } else {
    $stmt->bind_param('is', $id, $username);
  }

  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }

  header("Location: index.php");
?>