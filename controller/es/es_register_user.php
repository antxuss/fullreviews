<?php

include_once('../../model/es/es_usersModel.php');

$data = json_decode(file_get_contents("php://input"), true);

$name = $data['name'];
$firstLastName = $data['firstlastName'];
$secondLastName = $data['secondlastName'];
$email = $data['email'];
$username = $data['username'];
$password = $data['password'];

$response = array();

try {
    $users = new es_usersModel();

    // Setters para los datos del usuario
    $users->setNombre($name);
    $users->setApellido_1($firstLastName);
    $users->setApellido_2($secondLastName);
    $users->setCorreo($email);
    $users->setNombre_usuario($username);
    $users->setContrasena($password);

    // Intentar registrar al usuario
    $users->registerUser();

    // Si todo va bien, devolver una respuesta de éxito
    $response['success'] = true;
    $response['message'] = "Usuario registrado correctamente.";
} catch (Exception $e) {
    // Si ocurre algún error, devolver una respuesta de error
    $response['success'] = false;
    $response['error'] = "Error al registrar el usuario: " . $e->getMessage();
}

echo json_encode($response);
?>
