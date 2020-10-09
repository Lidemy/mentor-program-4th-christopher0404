<?php
  require_once('conn.php');
  header('Content-type: application/json; charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  $todo = $_POST['todo'];

  if (empty($todo)) {
    $json = array(
      "ok" => false,
      "message" => "Please input missing fields."
    );
    $response = json_encode($json);
    echo $response;
    die();
  }

  $stmt = $conn->prepare("INSERT INTO `Christopher_todolist`(`todo`) VALUES (?)");
  $stmt->bind_param('s', $todo);
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
    "message" => "Success!",
    "id" => $conn->insert_id
  );

  $response = json_encode($json);
  echo $response;
?>
