<?php

include_once('../../model/es/es_usersModel.php');

$data = json_decode(file_get_contents("php://input"), true);

$response = array();

if (isset($data['username'])) {
    $username = $data['username'];

    $users = new es_usersModel();
    $users->setNombre_usuario($username);

    try {
        $response['list'] = $users->inputSearchUsersList(); 
        $response['error'] = "no error";
    } catch (Exception $e) {
        $response['list'] = [];
        $response['error'] = $e->getMessage();
    }

    unset($users);
} else {
    $response['error'] = 'Username not provided';
}

echo json_encode($response);

?>
