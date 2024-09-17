<?php
include_once('../../model/es/es_usersModel.php');

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'];
$newPassword = $data['newPassword'];

$users = new es_usersModel();
$users->setCorreo($email);

$oldPasswordHash = $users->getPasswordHash(); 

$isSame = password_verify($newPassword, $oldPasswordHash);

echo json_encode(['isSame' => $isSame]);
?>
