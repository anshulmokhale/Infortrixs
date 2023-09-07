<?php

session_start();
include "./connect.php";

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $response = array();
    if (isset($_SESSION["userid"])) {
        $response["email"] = $_SESSION["userid"];
    }
    $query = $pdo->prepare("SELECT * FROM messages");
    $query->execute();
    $messages = $query->fetchAll(PDO::FETCH_ASSOC);

    $response["name"] =  array_column($messages, "sender_name");
    $response["messages"] =  array_column($messages, "msg");
    $response["time"] =  array_column($messages, "time");

    echo json_encode($response);
}
