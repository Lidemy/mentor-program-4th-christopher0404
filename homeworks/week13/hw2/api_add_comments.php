<?php
  require_once('conn.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  $site_key = $_POST['site_key'];
  $nickname = $_POST['nickname'];
  $content = $_POST['content'];

  if (empty($site_key) || empty($nickname) || empty($content)) {
    $json = array(
      "ok" => false,
      "message" => "Please input missing fields."
    );
    $response = json_encode($json);
    echo $response;
    die();
  }

  $sql = "INSERT INTO `Christopher_board_discussions`(`site_key`, `nickname`, `content`) VALUES (?, ?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sss', $site_key, $nickname, $content);
  $result = $stmt->execute();

  if (!$result) {
    $json = array(
      "ok" => false,
      "message" => $conn->error
    );
    $response = json_encode($json);
    echo $response;
    die();
  }

  $json = array(
    "ok" => true,
    "message" => "Success!"
  );

  $response = json_encode($json);
  echo $response;
?>
