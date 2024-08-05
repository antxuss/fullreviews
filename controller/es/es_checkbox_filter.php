<?php
include_once('../../model/es/es_usersModel.php');

$data = json_decode(file_get_contents("php://input"), true);

$favorito = $data['favorito'];
$suspendido = $data['suspendido'];
$tipo_usuario = $data['tipo_usuario'];

$users = new es_usersModel();

$users->setFavorito($favorito);
$users->setSuspendido($suspendido);

if (!empty($tipo_usuario)) {
    $users->setTipo_usuario($tipo_usuario);
} else {
    $users->setTipo_usuario(null);
}

$userList = $users->checkboxFilterList();

$response = array();
$response['error'] = "not error";
$response['list'] = $userList;

echo json_encode($response);
?>



