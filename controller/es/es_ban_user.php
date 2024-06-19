<?php

include_once('../../model/es/es_usersModel.php');

$data = json_decode(file_get_contents("php://input"), true);

$users = new es_usersModel();

$id = $data['id_usuario'];
$response = array();

$users->setId_usuario($id);
$result = $users->banUser();
if (isset($result['suspendido'])) {
    $response['suspendido'] = $result['suspendido'];
    $response['error'] = "Usuario encontrado";
} else {
    $response['error'] = $result['error'];
}

echo json_encode($response);