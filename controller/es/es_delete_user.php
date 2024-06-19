<?php

include_once('../../model/es/es_usersModel.php');

$data=json_decode(file_get_contents("php://input"),true);

$users= new es_usersModel();

$id = $data['id_usuario'];
$response=array();

    $users= new es_usersModel();
    $users->setId_usuario($id);
    $users->deleteUser();
    $response['list']= $users->ObjVars();
    $response['error']="Usuario eliminado";
  
echo json_encode($response);