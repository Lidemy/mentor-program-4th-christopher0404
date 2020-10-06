<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $username = NULL;
  $user = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
  }

  if ($user === NULL || $user['role'] !== 'admin') {
    header("Location: index.php");
    exit();
  }

  $sql = "SELECT `id`, `role`, `nickname`, `username` FROM `Christopher_board_users` ORDER BY `id` ASC";
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
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>User Role Management</title>
  <link rel="stylesheet" href="style/main.css">
  <script src="js/admin.js" defer></script>
</head>

<body class="body">
  <nav class="nav">
    <ul class="nav__list">
      <li class="nav__item">
        <a href="index.php" class="nav__link">Home</a>
      </li>

      <?php if (!$username) { ?>

        <li class="nav__item">
          <a href="register.php" class="nav__link">Sign Up</a>
        </li>
        <li class="nav__item">
          <a href="login.php" class="nav__link">Log In</a>
        </li>

      <?php } else { ?>

        <li class="nav__item nav__username">
          <?php echo "Hi, {$username}" ?>
        </li>
        <li class="nav__item">
          <a href="logout.php" class="nav__link">Log out</a>
        </li>

      <?php } ?>
    </ul>
  </nav>

  <main class="role-management">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">nickname</th>
          <th scope="col">username</th>
          <th scope="col">role</th>
        </tr>
      </thead>

      <tbody>
      <?php while ($row = $result->fetch_assoc()) { ?>
        <tr>
          <th scope="row"><?php echo escape($row['id']); ?></th>
          <td><?php echo escape($row['nickname']); ?></td>
          <td><?php echo escape($row['username']); ?></td>
          <!-- <td><?php echo escape($row['role']); ?></td> -->
          <td>
            <form action="handle_update_role.php" method="POST" class="table__form">
              <span class="user-role invisible"><?php echo escape($row['role']); ?></span>
              <div class="select">
                <select name="role">
                  <option value="admin">admin</option>
                  <option value="editor">editor</option>
                  <option value="author">author</option>
                  <option value="blocked">blocked</option>
                </select>
              </div>
              <input type="hidden" name="id" value="<?php echo escape($row['id']); ?>">
              <button type="submit" class="btn">Update</button>
            </form>
            <!-- <a href="handle_update_role.php?role=admin&id=<?php echo escape($row['id']); ?>">Admin</a>
            <a href="handle_update_role.php?role=author&id=<?php echo escape($row['id']); ?>">Author</a>
            <a href="handle_update_role.php?role=banned&id=<?php echo escape($row['id']); ?>">Banned</a> -->
          </td>
        </tr>
      <?php } ?>
      </tbody>
    </table>
  </main>
</body>
</html>
