<?php
include_once("../model/UsuariosModel.php");

$data=json_decode(file_get_contents("php://input"),true);

$nombre=$data['nombre'];
$password=$data['password'];

$response=array();

if (( $nombre !=null ) && ( $password !=null )){

  $user = new usuarioModel(); //Creamos el objeto del modelo
  $user->setNombre($nombre);  //Ponemos los datos en el objeto creado anteriormente 
  $user->setPassword($password);
  //$id->$_SESSION['id']; 
 
    
    if ($valor=$user->setUserData()){
        session_start(); 
        $_SESSION['nombre']=$nombre;
        $_SESSION['id']=$valor;
        
        if($user->findadmin()){
            $response['tipo'] = "admin"; 
            $_SESSION['tipo']=1;
        }else{
            $response['tipo'] = "cliente";
            $_SESSION['tipo']=0;
        }


        $response['nombre']=$nombre;
        $response['error']="no error";       
    } else {
        $response['error']="incorrect user";
    } 

} else {
    $response['error']="username or password not filled";
}

echo json_encode($response);

unset($response);