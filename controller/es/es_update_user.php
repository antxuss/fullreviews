<?php
include_once('../../model/es/es_usersModel.php');

$data = json_decode(file_get_contents("php://input"), true);

$users = new es_usersModel();


$id = $data['id'];
$nombre=$data['nombre'];
$primerApellido=$data['primerApellido'];
$segundoApellido=$data['segundoApellido'];
$correo=$data['correo'];
$telefono=$data['telefono'];
$direccion=$data['direccion'];
$nombre_usuario=$data['nombre_usuario'];
$password=$data['password'];
$tipo=$data['tipo'];
$foto_perfil=$data['foto_perfil'];

    $users->setId_usuario($id);
    $users->setNombre($nombre);
    $users->setApellido_1($primerApellido);
    $users->setApellido_2($segundoApellido);
    $users->setCorreo($correo);
    $users->setTelefono($telefono);
    $users->setDireccion($direccion);
    $users->setNombre_usuario($nombre_usuario);
    $users->setContrasena($password);
    $users->setTipo_usuario($tipo);
    $users->setFoto_perfil($foto_perfil);
    $response['error']= $users->updateUser();
   

echo json_encode($response);