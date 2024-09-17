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


    public function inputSearchUsersList()
    {
        $this->OpenConnect();
        $username = $this->getNombre_usuario();
        $username = mysqli_real_escape_string($this->link, $username);

        $sql = "SELECT * FROM usuarios WHERE nombre_usuario LIKE '$username%'";
        $result = $this->link->query($sql);

        if ($result === false) {
            echo "Error ejecutando la consulta: " . $this->link->error;
            return [];
        }

        $list = array();

        while ($row = $result->fetch_assoc()) {
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
            $new->setDireccion($row['direccion']);
            $new->setFavorito($row['favorito']);
            $new->setSuspendido($row['suspendido']);

            array_push($list, get_object_vars($new));
        }

        $result->free();
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

            $foto_perfil_absoluta = realpath('../' . $foto_perfil_url);

            if ($foto_perfil_absoluta && file_exists($foto_perfil_absoluta)) {
                if (unlink($foto_perfil_absoluta)) {
                    $this->CloseConnect();
                    return json_encode(['error' => false, 'message' => "Imagen del usuario eliminada correctamente"]);
                } else {
                    $this->CloseConnect();
                    return json_encode(['error' => true, 'message' => "Error al eliminar la imagen del usuario"]);
                }
            } else {
                $this->CloseConnect();
                return json_encode(['error' => true, 'message' => "La imagen de perfil del usuario no se encontró en el sistema de archivos"]);
            }
        } else {
            $this->CloseConnect();
            return json_encode(['error' => true, 'message' => "No se pudo encontrar la URL de la foto de perfil del usuario"]);
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

    public function checkboxFilterList()
    {
        $this->OpenConnect();
        $favorito = $this->getFavorito();
        $suspendido = $this->getSuspendido();
        $tipo_usuario = $this->getTipo_usuario();

        $sql = "SELECT * FROM usuarios WHERE 1=1";
        $params = [];
        $types = '';

        if (!empty($favorito)) {
            $sql .= " AND favorito = ?";
            $params[] = $favorito;
            $types .= 's';
        }

        if (!empty($suspendido)) {
            $sql .= " AND suspendido = ?";
            $params[] = $suspendido;
            $types .= 's';
        }

        if (!empty($tipo_usuario)) {
            $sql .= " AND tipo_usuario = ?";
            $params[] = $tipo_usuario;
            $types .= 's';
        }

        $stmt = $this->link->prepare($sql);

        if (!$stmt) {
            echo "Error preparando la consulta: " . $this->link->error;
            return [];
        }

        if ($params) {
            $stmt->bind_param($types, ...$params);
        }

        $stmt->execute();
        $result = $stmt->get_result();

        $list = array();
        while ($row = $result->fetch_assoc()) {
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
            $new->setDireccion($row['direccion']);
            $new->setFavorito($row['favorito']);
            $new->setSuspendido($row['suspendido']);

            array_push($list, get_object_vars($new));
        }

        $result->free();
        $this->CloseConnect();

        return $list;
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


    public function checkUserAvailability()
    {
        $this->OpenConnect();
        $username = $this->getNombre_usuario();

        $sql = "SELECT COUNT(*) as count FROM usuarios WHERE nombre_usuario = ?";

        if ($stmt = $this->link->prepare($sql)) {
            // Enlazar el parámetro
            $stmt->bind_param("s", $username);
            $stmt->execute();

            $result = $stmt->get_result();
            $row = $result->fetch_assoc();
            $count = $row['count'];

            $stmt->close();
            $this->CloseConnect();
            return $count > 0;
        } else {
            $this->CloseConnect();
            throw new Exception("Error al preparar la consulta: " . $this->link->error);
        }
    }

    /************************************************************************************** */


    public function checkEmailAvailability()
    {
        $this->OpenConnect();

        $email = $this->getCorreo();
        $sql = "SELECT COUNT(*) as count FROM usuarios WHERE correo = '$email'";
        $result = $this->link->query($sql);

        $row = $result->fetch_assoc();
        $count = $row['count'];

        $this->CloseConnect();

        return $count > 0;
    }

    /************************************************************************************** */


    public function getPasswordHash()
    {
        $this->OpenConnect();

        $email = $this->getCorreo();
        $sql = "SELECT contrasena FROM usuarios WHERE correo = ?";

        $stmt = $this->link->prepare($sql);
        if ($stmt === false) {
            error_log("Error preparando la consulta: " . $this->link->error);
            return null;
        }

        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows == 1) {
            $row = $result->fetch_assoc();
            $passwordHash = $row['contrasena'];  // Cambiado de 'password' a 'contrasena'
        } else {
            $passwordHash = null;
        }

        $stmt->close();
        $this->CloseConnect();

        return $passwordHash;
    }


    /************************************************************************************** */

    public function updatePasswordPlain()
    {
        $this->OpenConnect();

        $email = $this->getCorreo();
        $newPassword = $this->getContrasena();

        if ($this->link->connect_error) {
            error_log("Error de conexión a la base de datos: " . $this->link->connect_error);
            return false;
        }

        $sql = "UPDATE usuarios SET contrasena = ? WHERE correo = ?";
        $stmt = $this->link->prepare($sql);

        if (!$stmt) {
            error_log("Error en la preparación de la consulta SQL: " . $this->link->error);
            $this->CloseConnect();
            return false;
        }

        $stmt->bind_param("ss", $newPassword, $email);

        $success = $stmt->execute();

        if (!$success) {
            error_log("Error en la ejecución de la consulta SQL: " . $stmt->error);
        } else {
            error_log("Consulta ejecutada exitosamente. Contraseña actualizada para el correo: " . $email);
        }

        $stmt->close();
        $this->CloseConnect();

        return $success;
    }

    /************************************************************************************** */

    public function findUserLogin()
    {
        $this->OpenConnect();

        $username = $this->getNombre_usuario();
        $password = $this->getContrasena();

        // Consulta SQL para verificar el usuario y la contraseña
        $sql = "SELECT id_usuario FROM usuarios WHERE nombre_usuario = ? AND contrasena = ?";
        $stmt = $this->link->prepare($sql);
        if ($stmt === false) {
            error_log("Error preparando la consulta: " . $this->link->error);
            return false;
        }

        $stmt->bind_param("ss", $username, $password);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows == 1) {
            $row = $result->fetch_assoc();
            $userId = $row['id_usuario'];
        } else {
            $userId = false;
        }

        $stmt->close();
        $this->CloseConnect();

        return $userId;
    }


    /************************************************************************************** */

    public function findUserLoginStatus()
    {
        $this->OpenConnect();

        $username = $this->getNombre_usuario();
        $password = $this->getContrasena();

        $sql = "SELECT suspendido FROM usuarios WHERE nombre_usuario = ? AND contrasena = ?";
        $stmt = $this->link->prepare($sql);
        if ($stmt === false) {
            error_log("Error preparando la consulta: " . $this->link->error);
            return false;
        }

        $stmt->bind_param("ss", $username, $password);
        $stmt->execute();
        $result = $stmt->get_result();

        $status = true;
        if ($result->num_rows == 1) {
            $row = $result->fetch_assoc();

            if ($row['suspendido'] === 'Si') {
                $status = false;
            } else {
                $status = true;
            }
        }

        $stmt->close();
        $this->CloseConnect();

        return $status;
    }


    /************************************************************************************** */


    public function findUserLoginType()
    {
        $this->OpenConnect();

        $username = $this->getNombre_usuario();

        // Consulta SQL para verificar el tipo de usuario
        $sql = "SELECT tipo_usuario FROM usuarios WHERE nombre_usuario = ?";

        $stmt = $this->link->prepare($sql);
        if ($stmt === false) {
            error_log("Error preparando la consulta: " . $this->link->error);
            return false;
        }

        $stmt->bind_param("s", $username);

        $stmt->execute();

        $result = $stmt->get_result();

        if ($result->num_rows == 1) {
            $row = $result->fetch_assoc();
            $isAdmin = $row['tipo_usuario'] === 'Administrador';
        } else {
            $isAdmin = false;
        }

        $stmt->close();
        $this->CloseConnect();

        return $isAdmin;
    }



    /************************************************************************************** */

    public function getUserProfileDetails()
{
    $this->OpenConnect();

    $userId = $this->getId_usuario();

    $sql = "SELECT nombre_usuario, nombre, apellido_1, apellido_2, correo, telefono, foto_perfil, tipo_usuario, contrasena, direccion, favorito, suspendido 
            FROM usuarios 
            WHERE id_usuario = ?";

    $stmt = $this->link->prepare($sql);
    if ($stmt === false) {
        error_log("Error preparando la consulta: " . $this->link->error);
        return false;
    }

    $stmt->bind_param("i", $userId);

    $stmt->execute();

    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        // Se devuelven los datos del usuario
        $userProfile = [
            'nombre_usuario' => $row['nombre_usuario'],
            'nombre' => $row['nombre'],
            'apellido_1' => $row['apellido_1'],
            'apellido_2' => $row['apellido_2'],
            'correo' => $row['correo'],
            'telefono' => $row['telefono'],
            'foto_perfil' => $row['foto_perfil'],
            'tipo_usuario' => $row['tipo_usuario'],
            'contrasena' => $row['contrasena'],
            'direccion' => $row['direccion'],
            'favorito' => $row['favorito'],
            'suspendido' => $row['suspendido'],
        ];
    } else {
        $userProfile = false; // No se encontró el usuario
    }

    $stmt->close();
    $this->CloseConnect();

    return $userProfile;
}




    /************************************************************************************** */

    public function getUsernameByEmail()
    {
        $this->OpenConnect();

        $email = $this->getCorreo();

        $sql = "SELECT nombre_usuario FROM usuarios WHERE correo = ?";

        $stmt = $this->link->prepare($sql);
        if ($stmt === false) {
            error_log("Error preparando la consulta: " . $this->link->error);
            return null;
        }

        $stmt->bind_param("s", $email);

        $stmt->execute();

        $result = $stmt->get_result();

        if ($result->num_rows == 1) {
            $row = $result->fetch_assoc();
            $username = $row['nombre_usuario'];
        } else {
            $username = null;
        }

        $stmt->close();
        $this->CloseConnect();

        return $username;
    }


    /************************************************************************************** */


    public function getUserByEmailAndPassword()
    {
        $this->OpenConnect();

        $email = $this->getCorreo();
        $password = $this->getContrasena();

        if ($this->link->connect_error) {
            error_log("Error de conexión a la base de datos: " . $this->link->connect_error);
            return null;
        }

        // Consulta SQL que selecciona nombre_usuario donde coincidan correo y contraseña
        $sql = "SELECT nombre_usuario FROM usuarios WHERE correo = ? AND contrasena = ?";
        $stmt = $this->link->prepare($sql);

        if (!$stmt) {
            error_log("Error en la preparación de la consulta SQL: " . $this->link->error);
            $this->CloseConnect();
            return null;
        }

        // Bindeo de parámetros: correo y contraseña
        $stmt->bind_param("ss", $email, $password);

        $stmt->execute();

        $result = $stmt->get_result();
        error_log("Número de filas encontradas: " . $result->num_rows);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $username = $row['nombre_usuario'];
            error_log("Nombre de usuario obtenido: " . $username);
        } else {
            error_log("No se encontró ningún usuario con esas credenciales: " . $email);
            $username = null;
        }

        $stmt->close();
        $this->CloseConnect();

        return $username;
    }


    /************************************************************************************** */

    public function updateUsername()
    {
        $this->OpenConnect();

        $email = $this->getCorreo();
        $newUsername = $this->getNombre_Usuario();

        if ($this->link->connect_error) {
            error_log("Error de conexión a la base de datos: " . $this->link->connect_error);
            return false;
        }

        $sql = "UPDATE usuarios SET nombre_usuario = ? WHERE correo = ?";
        $stmt = $this->link->prepare($sql);

        if (!$stmt) {
            error_log("Error en la preparación de la consulta SQL: " . $this->link->error);
            $this->CloseConnect();
            return false;
        }

        $stmt->bind_param("ss", $newUsername, $email);

        $success = $stmt->execute();

        if (!$success) {
            error_log("Error en la ejecución de la consulta SQL: " . $stmt->error);
        } else {
            error_log("Consulta ejecutada exitosamente. Nombre de usuario actualizado para el correo: " . $email);
        }

        $stmt->close();
        $this->CloseConnect();

        return $success;
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

    public function registerUser()
    {

        $this->OpenConnect();
        $name = $this->getNombre();
        $firstLastName = $this->getApellido_1();
        $secondLastName = $this->getApellido_2();
        $email = $this->getCorreo();
        $username = $this->getNombre_usuario();
        $password = $this->getContrasena();


        $sql = "INSERT INTO usuarios(nombre_usuario,nombre,apellido_1,apellido_2,correo,telefono,foto_perfil,tipo_usuario,contrasena,direccion,favorito,suspendido) VALUES ('$username','$name','$firstLastName','$secondLastName','$email','','../view/img/img-users/perfil-de-usuario-provisional.webp','Usuario','$password','','No','No')";

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
