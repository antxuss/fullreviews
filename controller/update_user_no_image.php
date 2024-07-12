<?php
include_once('../model/es/es_usersModel.php');

$data = json_decode(file_get_contents("php://input"), true);

$users = new es_usersModel();


$id = $data['id'];
$foto_perfil=$data['foto_perfil'];

    $users->setId_usuario($id);
    $users->setFoto_perfil($foto_perfil);
    $response['error']= $users->updateUserNoImage();
   

echo json_encode($response);