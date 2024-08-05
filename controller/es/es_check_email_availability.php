<?php

include_once('../../model/es/es_usersModel.php');

$data = json_decode(file_get_contents("php://input"), true);

$users = new es_usersModel();

$email = $data['email'];
$response = array();

$users->setCorreo($email);

if ($users->checkEmailAvailability()) {
    $response['exists'] = true;
} else {
    $response['exists'] = false;
}

echo json_encode($response);
?>
