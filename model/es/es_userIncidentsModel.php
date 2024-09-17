<?php

include_once("connect_data.php");
include_once("es_userIncidentsClass.php");
include_once("es_userIncidentsModel.php");

class es_userIncidentsModel extends es_userIncidentsClass
{
    private $link;

    public function OpenConnect()
    {
        $konDat = new connect_data();
        try {
            $this->link = new mysqli($konDat->host, $konDat->userbbdd, $konDat->passbbdd, $konDat->ddbbname);
        } catch (Exception $e) {
            echo $e->getMessage();
        }
        $this->link->set_charset("utf8"); // honek behartu egiten du aplikazio eta
        //                  //databasearen artean UTF -8 erabiltzera datuak trukatzeko
    }


    /************************************************************************************** */


    public function saveUserIncident()
    {
        $this->OpenConnect();
        $correo = $this->getCorreo();
        $razon = $this->getRazon();
        $detalles = $this->getDetalles();
        $solucionado = 'No'; 

        $sql = "INSERT INTO incidencias_usuarios (correo, razon, detalles, solucionado) 
            VALUES ('$correo', '$razon', '$detalles', '$solucionado')";

        $this->link->query($sql);

        if ($this->link->affected_rows == 1) {
            $msg = $sql . " La incidencia se ha insertado con éxito. Num de inserts: " . $this->link->affected_rows;
        } else {
            $msg = $sql . " Fallo al insertar una nueva incidencia: (" . $this->link->errno . ") " . $this->link->error;
        }

        $this->CloseConnect();

        return $msg;
    }


    /************************************************************************************** */

    public function CloseConnect()
    {
        mysqli_close($this->link);
    }

    public function ObjVars()
    {
        return get_object_vars($this);
    }
}
