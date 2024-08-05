<?php
include_once('../../model/es/es_usersModel.php');

$data = json_decode(file_get_contents("php://input"), true);

$users = new es_usersModel();

$username = $data['username'];
$users->setNombre_usuario($username);

$response = [];
try {
    $response['exists'] = $users->checkUserAvailability();
} catch (Exception $e) {
    $response['error'] = true;
}

echo json_encode($response);
?>