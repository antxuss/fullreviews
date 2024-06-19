<?php

include_once('../../model/es/es_usersModel.php');

$users= new es_usersModel();

$response=array();
$response['list']=$users->usersList(); 
$response['error']="not error"; 

echo json_encode($response);

unset ($users);
