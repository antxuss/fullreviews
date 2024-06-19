<?php

include_once('../../model/es/es_usersModel.php');

$data = json_decode(file_get_contents("php://input"), true);

$users = new es_usersModel();
$response = array();

if (isset($data['id'])) {
    $id = $data['id'];
    $users->setId_usuario($id);

    if ($users->showUpdate()) {
        $response['usuario'] = $users->ObjVars();
        $response['error'] = "no error";
    } else {
        $response['error'] = "error";
    }
} else {
    $response['error'] = "error";
}

echo json_encode($response);

unset($response);
unset($users);
?>
