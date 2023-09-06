<?php

session_start();

header("Content-Type:application/json");

if($_SERVER["REQUEST_METHOD"]=="GET")
{
    $response = array(
        "email" => $_SESSION["userid"]
    );
    echo json_encode($response);
}
