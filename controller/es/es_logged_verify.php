<?php
session_start();
include_once('../../model/es/es_usersModel.php');

$response = array();

if (isset($_SESSION['id_usuario'])) {
    $user = new es_usersModel();
    $user->setId_usuario($_SESSION['id_usuario']);

    if ($userData = $user->getUserProfileDetails()) {
        $response["id_usuario"] = $_SESSION['id_usuario'];
        $response["nombre_usuario"] = $userData['nombre_usuario'];
        $response["nombre"] = $userData['nombre'];
        $response["apellido_1"] = $userData['apellido_1'];
        $response["apellido_2"] = $userData['apellido_2'];
        $response["telefono"] = $userData['telefono'];
        $response["correo"] = $userData['correo'];
        $response["foto_perfil"] = $userData['foto_perfil'];
        $response["tipo_usuario"] = $userData['tipo_usuario'];
        $response["contrasena"] = $userData['contrasena'];
        $response["direccion"] = $userData['direccion'];
        $response["favorito"] = $userData['favorito'];
        $response["suspendido"] = $userData['suspendido'];
        $response["error"] = "logged";
    } else {
        $response["error"] = "no user data";
    }
} else {
    $response["error"] = "not logged";
}

echo json_encode($response);
?>
