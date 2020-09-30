<?php
  if (!isAdmin(getUserFromUsername($_SESSION['username']))) {
    header('Location: login.php');
    exit();
  }
?>
