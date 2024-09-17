<?php
include_once('../../model/es/es_usersModel.php');

$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'];
$newPassword = $data['newPassword'];
$confirmPassword = $data['confirmPassword'];

$response = array();

$users = new es_usersModel();
$users->setCorreo($email);

// Verificar que las contraseñas coincidan
if ($newPassword !== $confirmPassword) {
    $response['success'] = false;
    $response['error'] = 'Las contraseñas no coinciden.';
    echo json_encode($response);
    exit;
}

// Establecer la nueva contraseña en texto plano
$users->setContrasena($newPassword);

// Intentar actualizar la contraseña
if ($users->updatePasswordPlain()) {
    $response['success'] = true;
} else {
    // Log para depurar el problema
    error_log("Error al actualizar la contraseña para el correo: " . $email);
    $response['success'] = false;
    $response['error'] = 'No se pudo actualizar la contraseña.';
}

echo json_encode($response);
?>
