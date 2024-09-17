<?php

include_once('../../model/es/es_usersModel.php');

$data = json_decode(file_get_contents("php://input"), true);

$users = new es_usersModel();

$email = $data['email'];
$password = $data['password'];

$response = array();

$users->setCorreo($email);
$users->setContrasena($password);

$hashedPassword = $users->getUserByEmailAndPassword();

if ($hashedPassword) {
    $response['success'] = true; 
    $response['message'] = 'Usuario encontrado';
} else {
    $response['success'] = false;
    $response['message'] = 'Correo o contraseña incorrectos'; 
}

echo json_encode($response);
?>
