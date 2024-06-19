<?php

include_once('../../model/es/es_usersModel.php');

$data = json_decode(file_get_contents("php://input"), true);



$name = $data['name'];
$firstLastName = $data['firstLastName'];
$secondLastName = $data['secondLastName'];
$mail = $data['mail'];
$tlf = $data['tlf'];
$username = $data['username'];
$password = $data['password'];
$userType = $data['userType'];
$userImg = $data['userImg'];
$address = $data['address'];


    $users= new es_usersModel();
   
    $users->setNombre($name);
    $users->setApellido_1($firstLastName);
    $users->setApellido_2($secondLastName);
    $users->setCorreo($mail);
    $users->setTelefono($tlf);
    $users->setNombre_usuario($username);
    $users->setContrasena($password);
    $users->setTipo_usuario($userType);
    $users->setFoto_perfil($userImg);
    $users->setDireccion($address);
    
    $users->addUser();   

    $response = array();
    
    $response['error'] = "not error";
    

echo json_encode($response);