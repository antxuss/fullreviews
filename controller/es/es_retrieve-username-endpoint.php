<?php
include_once('../../model/es/es_usersModel.php');

$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'];

$users = new es_usersModel();
$users->setCorreo($email);

$username = $users->getUsernameByEmail();

if ($username) {
    echo json_encode(['success' => true, 'username' => $username]);
} else {
    echo json_encode(['success' => false, 'message' => 'No se encontró el nombre de usuario para el correo proporcionado.']);
}
?>
