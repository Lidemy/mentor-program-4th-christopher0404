<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  if (empty($_POST['id']) || empty($_POST['role'])) {
    die('資料不齊全');
  }

  $username = $_SESSION['username'];
  $user = getUserFromUsername($username);
  $id = $_POST['id'];
  $role = $_POST['role'];

  if (!$user || $user['role'] !== 'admin') {
    header("Location: index.php");
  }

  $sql = "UPDATE `Christopher_board_users` SET `role` = ? WHERE `id` = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('si', $role, $id);

  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }

  header("Location: admin.php");
?>
