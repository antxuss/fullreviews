<?php

class connect_data
{
    public $host='localhost';
    public $userbbdd='root';
    public $passbbdd='';
    public $ddbbname='es_fullreviews';
}

$conexion = new connect_data();
$mysqli = new mysqli($conexion->host, $conexion->userbbdd, $conexion->passbbdd, $conexion->ddbbname);

$mysqli->close();
