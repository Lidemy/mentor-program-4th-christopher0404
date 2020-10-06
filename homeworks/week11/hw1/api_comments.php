<?php
  require_once("conn.php");
  header('Content-type:application/json;charset=utf-8');

  /* 分頁
    $page = 1;
    if (!empty($_GET['page'])) {
      $page = intval($_GET['page']);
    }
    $items_per_page = 10;
    $offset = ($page - 1) * $items_per_page;

    $stmt = $conn->prepare("SELECT * FROM `Christopher_board_comments` LEFT JOIN `Christopher_board_users` ON `Christopher_board_comments`.`username` = `Christopher_board_users`.`username` WHERE `Christopher_board_comments`.`is_deleted` IS NULL ORDER BY `Christopher_board_comments`.`id` DESC LIMIT ? OFFSET ?");

    $stmt->bind_param('ii', $items_per_page, $offset);
  */

  $stmt = $conn->prepare("SELECT * FROM `Christopher_board_comments` LEFT JOIN `Christopher_board_users` ON `Christopher_board_comments`.`username` = `Christopher_board_users`.`username` WHERE `Christopher_board_comments`.`is_deleted` IS NULL ORDER BY `Christopher_board_comments`.`id` DESC");

  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }
  $result = $stmt->get_result();

  $Christopher_board_comments = array();

  while($row = $result->fetch_assoc()) {
    array_push($Christopher_board_comments, array(
      "id" => $row['id'],
      "username" => $row['username'],
      "nickname" => $row['nickname'],
      "content" => $row['content'],
      "created_at" => $row['created_at']
    ));
  }

  $json = array("Christopher_board_comments" => $Christopher_board_comments);
  $response = json_encode($json);
  echo $response;
?>
