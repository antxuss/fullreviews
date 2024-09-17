<?php
include_once('../../model/es/es_usersModel.php');

$data = json_decode(file_get_contents("php://input"), true);

$username = $data['username'];
$password = $data['password'];

$response = array();

if (!empty($username) && !empty($password)) {

    $user = new es_usersModel(); 
    $user->setNombre_usuario($username);
    $user->setContrasena($password);

    if ($valor = $user->findUserLogin()) {

        if ($user->findUserLoginStatus() === false) {
            $response['error'] = "user suspended";
        } else {
            session_start();
            $_SESSION['nombre_usuario'] = $username;
            $_SESSION['id_usuario'] = $valor;

            if ($user->findUserLoginType()) {
                $response['tipo_usuario'] = "Administrador";
                $_SESSION['tipo_usuario'] = "Administrador";
            } else {
                $response['tipo_usuario'] = "Usuario";
                $_SESSION['tipo_usuario'] = "Usuario"; 
            }

            $response['nombre_usuario'] = $username;
            $response['error'] = "no error";
        }
        
    } else {
        $response['error'] = "incorrect user";
    }

} else {
    $response['error'] = "username or password not filled";
}

echo json_encode($response);
unset($response);
?>
