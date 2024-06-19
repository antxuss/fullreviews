<?php
include_once('../../model/es/connect_data.php');

$connection = new mysqli($host, $userbbdd, $passbbdd, $ddbbname);
$response = array();

if ($connection->connect_error) {
    $response['success'] = false;
    $response['message'] = 'Connection failed: ' . $connection->connect_error;
    echo json_encode($response);
    exit;
} else {
    $response['success'] = true;
    $response['message'] = 'Connected successfully';
}

echo json_encode($response);
?>