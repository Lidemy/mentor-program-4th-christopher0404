<?php
  require_once('conn.php');

  function getUserFromUsername($username) {
    global $conn;
    $stmt = $conn->prepare("SELECT * FROM `Christopher_board_users` WHERE `username` = ?");
    $stmt->bind_param('s', $username);
    $result = $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    return $row;
  }

  function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES);
  }

  // $action: create, update, delete
  function hasPermission($user, $action, $comment) {
    if (!isset($user['role'])) return false;

    if ($user['role'] === 'admin') return true;

    if ($user['role'] === 'author') {
      if ($action === 'create') return true;
      return $comment['username'] === $user['username'];
    }

    if ($user['role'] === 'blocked') {
      if ($action === 'create') return false;
      return $comment['username'] === $user['username'];
    }

    if ($user['role'] === 'editor') {
      if ($action === 'create' || $action === 'update') return true;
      return $comment['username'] === $user['username'];
      if ($action === 'delete') return false;
    }
  }

  function isAdmin($user) {
    return $user['role'] === 'admin';
  }

  function isEditor($user) {
    return $user['role'] === 'editor';
  }
?>
