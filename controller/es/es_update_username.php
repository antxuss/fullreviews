<?php

include_once('../../model/es/es_usersModel.php');

$data = json_decode(file_get_contents("php://input"), true);

$users = new es_usersModel();

$email = $data['email'];
$newUsername = $data['newUsername'];

$users->setCorreo($email);
$users->setNombre_usuario($newUsername);

$response = array();

if ($users->updateUsername()) {
    $response['success'] = true;
    $response['message'] = 'Nombre de usuario actualizado correctamente.';
} else {
    $response['success'] = false;
    $response['message'] = 'Error al actualizar el nombre de usuario.';
}

// Devolver la respuesta en formato JSON
echo json_encode($response);
?>
