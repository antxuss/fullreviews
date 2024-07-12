<?php

include_once("connect_data.php");
include_once("es_usersClass.php");
include_once("es_usersModel.php");

class es_usersModel extends es_usersClass
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


    public function usersList()
    {

        $this->OpenConnect();

        $sql = "SELECT * FROM usuarios";
        $result = $this->link->query($sql);

        $list = array();

        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {

            $new = new es_usersClass();

            $new->setId_usuario($row['id_usuario']);
            $new->setNombre_usuario($row['nombre_usuario']);
            $new->setNombre($row['nombre']);
            $new->setContrasena($row['contrasena']);
            $new->setApellido_1($row['apellido_1']);
            $new->setApellido_2($row['apellido_2']);
            $new->setCorreo($row['correo']);
            $new->setTelefono($row['telefono']);
            $new->setFoto_perfil($row['foto_perfil']);
            $new->setTipo_usuario($row['tipo_usuario']);
            $new->setContrasena($row['contrasena']);
            $new->setDireccion($row['direccion']);
            $new->setFavorito($row['favorito']);
            $new->setSuspendido($row['suspendido']);

            array_push($list, get_object_vars($new));
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $list;
    }



    /************************************************************************************** */

    public function deleteUser()
    {
        $this->OpenConnect();

        $id = $this->getId_usuario();

        $sql = "DELETE from usuarios WHERE id_usuario=$id";

        $this->link->query($sql);

        if ($this->link->affected_rows == 1) {
            return "El usuario ha sido eliminado";
        } else {
            return "No se ha podido borrar el usuario";
        }

        $this->CloseConnect();
    }


    /************************************************************************************** */

    public function imgDeleteUser()
    {
        $this->OpenConnect();

        $id = $this->getId_usuario();

        $sql = "SELECT foto_perfil FROM usuarios WHERE id_usuario = $id";
        $result = $this->link->query($sql);

        if ($result && $result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $foto_perfil_url = $row['foto_perfil'];

            echo "Ruta de la imagen a eliminar: " . $foto_perfil_url;

            $foto_perfil_absoluta = realpath('../' . $foto_perfil_url);

            if ($foto_perfil_absoluta && file_exists($foto_perfil_absoluta)) {
                unlink($foto_perfil_absoluta);
                $this->CloseConnect();
                return "Imagen del usuario eliminada correctamente";
            } else {
                $this->CloseConnect();
                return "La imagen de perfil del usuario no se encontró en el sistema de archivos";
            }
        } else {
            $this->CloseConnect();
            return "No se pudo encontrar la URL de la foto de perfil del usuario";
        }
    }



    /************************************************************************************** */

    public function favoriteUser()
    {
        $this->OpenConnect();
        $id = $this->getId_usuario();
        $sql = "SELECT favorito FROM usuarios WHERE id_usuario = $id";
        $result = $this->link->query($sql);

        if ($result && $result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $favoritoActual = $row['favorito'];
            $nuevoEstadoFavorito = $favoritoActual === 'No' ? 'Si' : 'No';
            $updateSql = "UPDATE usuarios SET favorito = '$nuevoEstadoFavorito' WHERE id_usuario = $id";
            if ($this->link->query($updateSql) === TRUE) {
                return ['favorito' => $nuevoEstadoFavorito];
            } else {
                return ['error' => 'Error al actualizar el estado de favorito'];
            }
        } else {
            return ['error' => 'Usuario no encontrado'];
        }
    }


    /************************************************************************************** */

    public function banUser()
    {
        $this->OpenConnect();
        $id = $this->getId_usuario();
        $sql = "SELECT suspendido FROM usuarios WHERE id_usuario = $id";
        $result = $this->link->query($sql);

        if ($result && $result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $suspendidoActual = $row['suspendido'];
            $nuevoEstadoSuspendido = $suspendidoActual === 'No' ? 'Si' : 'No';
            $updateSql = "UPDATE usuarios SET suspendido = '$nuevoEstadoSuspendido' WHERE id_usuario = $id";
            if ($this->link->query($updateSql) === TRUE) {
                return ['suspendido' => $nuevoEstadoSuspendido];
            } else {
                return ['error' => 'Error al actualizar el estado de suspendido'];
            }
        } else {
            return ['error' => 'Usuario no encontrado'];
        }
    }


    /************************************************************************************** */


    public function addUser()
    {

        $this->OpenConnect();
        $name = $this->getNombre();
        $firstLastName = $this->getApellido_1();
        $secondLastName = $this->getApellido_2();
        $mail = $this->getCorreo();
        $tlf = $this->getTelefono();
        $username = $this->getNombre_usuario();
        $password = $this->getContrasena();
        $userType = $this->getTipo_usuario();
        $userImg = $this->getFoto_perfil();
        $address = $this->getDireccion();


        $sql = "INSERT INTO usuarios(nombre_usuario,nombre,apellido_1,apellido_2,correo,telefono,foto_perfil,tipo_usuario,contrasena,direccion,favorito,suspendido) VALUES ('$username','$name','$firstLastName','$secondLastName','$mail','$tlf','../view/img/img-users/$userImg','$userType','$password','$address','No','No')";

        $this->link->query($sql);

        if ($this->link->affected_rows == 1) {
            $msg = $sql . " El usuario se ha insertado con exito. Num de inserts: " . $this->link->affected_rows;
        } else {
            $msg = $sql . " Fallo al insertar un usuario nuevo: (" . $this->link->errno . ") " . $this->link->error;
        }
        $this->CloseConnect();
        return $msg;
    }

    /************************************************************************************** */

    public function showUpdate()
    {
        $this->OpenConnect();

        $id = $this->getId_usuario();
        $sql = "SELECT * FROM usuarios WHERE id_usuario = $id";

        $result = $this->link->query($sql);

        if ($result) {
            if ($row = $result->fetch_assoc()) {
                $this->id_usuario = $row['id_usuario'];
                $this->nombre_usuario = $row['nombre_usuario'];
                $this->contrasena = $row['contrasena'];
                $this->nombre = $row['nombre'];
                $this->apellido_1 = $row['apellido_1'];
                $this->apellido_2 = $row['apellido_2'];
                $this->correo = $row['correo'];
                $this->telefono = $row['telefono'];
                $this->foto_perfil = $row['foto_perfil'];
                $this->tipo_usuario = $row['tipo_usuario'];
                $this->direccion = $row['direccion'];
                $this->CloseConnect();
                return true;
            } else {
                $this->CloseConnect();
                return false;
            }
        } else {
            $this->CloseConnect();
            return false;
        }
    }

    /************************************************************************************** */

    public function updateUser()
    {
        $this->OpenConnect();

        $id = $this->getId_usuario();
        $nombre = $this->getNombre();
        $apellido_1 = $this->getApellido_1();
        $apellido_2 = $this->getApellido_2();
        $correo = $this->getCorreo();
        $telefono = $this->getTelefono();
        $direccion = $this->getDireccion();
        $nombre_usuario = $this->getNombre_usuario();
        $contrasena = $this->getContrasena();
        $tipo_usuario = $this->getTipo_usuario();
        $foto_perfil = $this->getFoto_perfil();


        $sql = "UPDATE usuarios set nombre_usuario='$nombre_usuario', nombre='$nombre', apellido_1='$apellido_1', apellido_2='$apellido_2', correo='$correo', telefono='$telefono', foto_perfil='../view/img/img-users/$foto_perfil', tipo_usuario='$tipo_usuario', contrasena='$contrasena', direccion='$direccion' where id_usuario=$id";

        $this->link->query($sql);

        if ($this->link->affected_rows == 1) {
            return $sql . "El usuario se ha modificado con exito.Num modificados: " . $this->link->affected_rows;
        } else {
            return $sql . "Falla la modificacion del usuario: (" . $this->link->errno . ") " . $this->link->error;
        }
        $this->CloseConnect();
    }

    /************************************************************************************** */

    public function updateUserNoImage()
    {
        $this->OpenConnect();

        $id = $this->getId_usuario();
        $foto_perfil = $this->getFoto_perfil();


        $sql = "UPDATE usuarios set foto_perfil='../view/img/img-users/$foto_perfil' where id_usuario=$id";

        $this->link->query($sql);

        if ($this->link->affected_rows == 1) {
            return $sql . "El usuario se ha modificado con exito.Num modificados: " . $this->link->affected_rows;
        } else {
            return $sql . "Falla la modificacion del usuario: (" . $this->link->errno . ") " . $this->link->error;
        }
        $this->CloseConnect();
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
