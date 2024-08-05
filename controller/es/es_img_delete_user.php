<?php

include_once('../../model/es/es_usersModel.php');

$data = json_decode(file_get_contents("php://input"), true);

$users = new es_usersModel();

$id = $data['id_usuario'];
$response = array();

$users->setId_usuario($id);
$imageDeletionResult = $users->imgDeleteUser();

$response['message'] = $imageDeletionResult;
$response['error'] = false;

echo json_encode($response);
?>
