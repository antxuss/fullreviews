<?php
class es_verification_codesModel {
    private $link;
    private $correo;
    private $codigo;
    private $nombre;
    private $apellido;
    private $usuario;
    private $password;

    public function __construct() {
        $this->OpenConnect();
    }

    public function OpenConnect() {
        $this->link = new mysqli("localhost", "root", "", "es_fullreviews");
        if ($this->link->connect_error) {
            die("Conexión fallida: " . $this->link->connect_error);
        }
    }

    public function CloseConnect() {
        $this->link->close();
    }

    public function setCorreo($correo) {
        $this->correo = $correo;
    }

    public function setCodigo($codigo) {
        $this->codigo = $codigo;
    }

    public function setNombre($nombre) {
        $this->nombre = $nombre;
    }

    public function setApellido($apellido) {
        $this->apellido = $apellido;
    }

    public function setUsuario($usuario) {
        $this->usuario = $usuario;
    }

    public function setPassword($password) {
        $this->password = $password;
    }

    public function saveVerificationCode() {
        $sql = "INSERT INTO verification_codes (correo, codigo, nombre, apellido, usuario, password) 
                VALUES ('$this->correo', '$this->codigo', '$this->nombre', '$this->apellido', '$this->usuario', '$this->password')";

        if ($this->link->query($sql) === TRUE) {
            return true;
        } else {
            return false;
        }
    }

    public function verifyCode($correo, $codigo) {
        $sql = "SELECT * FROM verification_codes WHERE correo='$correo' AND codigo='$codigo'";
        $result = $this->link->query($sql);

        if ($result->num_rows > 0) {
            return true;
        } else {
            return false;
        }
    }

    public function deleteVerificationCode($correo) {
        $sql = "DELETE FROM verification_codes WHERE correo='$correo'";

        if ($this->link->query($sql) === TRUE) {
            return true;
        } else {
            return false;
        }
    }
}
?>
