<?php

class es_usersClass
{
    protected $id_usuario;
    protected $nombre_usuario;
    protected $contrasena;
    protected $nombre;
    protected $apellido_1;
    protected $apellido_2;
    protected $correo;
    protected $telefono;
    protected $foto_perfil;
    protected $tipo_usuario;
    protected $direccion;
    protected $favorito;
    protected $suspendido;

    /**
     * Get the value of id
     */ 
    public function getId_usuario()
    {
        return $this->id_usuario;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */ 
    public function setId_usuario($id_usuario)
    {
        $this->id_usuario = $id_usuario;

        return $this;
    }

    /**
     * Get the value of id
     */ 
    public function getNombre_usuario()
    {
        return $this->nombre_usuario;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */ 
    public function setNombre_usuario($nombre_usuario)
    {
        $this->nombre_usuario = $nombre_usuario;

        return $this;
    }

    /**
     * Get the value of id
     */ 
    public function getContrasena()
    {
        return $this->contrasena;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */ 
    public function setContrasena($contrasena)
    {
        $this->contrasena = $contrasena;

        return $this;
    }

    /**
     * Get the value of id
     */ 
    public function getNombre()
    {
        return $this->nombre;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */ 
    public function setNombre($nombre)
    {
        $this->nombre = $nombre;

        return $this;
    }

    /**
     * Get the value of id
     */ 
    public function getApellido_1()
    {
        return $this->apellido_1;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */ 
    public function setApellido_1($apellido_1)
    {
        $this->apellido_1 = $apellido_1;

        return $this;
    }

    /**
     * Get the value of id
     */ 
    public function getApellido_2()
    {
        return $this->apellido_2;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */ 
    public function setApellido_2($apellido_2)
    {
        $this->apellido_2 = $apellido_2;

        return $this;
    }

    /**
     * Get the value of id
     */ 
    public function getCorreo()
    {
        return $this->correo;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */ 
    public function setCorreo($correo)
    {
        $this->correo = $correo;

        return $this;
    }

    /**
     * Get the value of id
     */ 
    public function getTelefono()
    {
        return $this->telefono;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */ 
    public function setTelefono($telefono)
    {
        $this->telefono = $telefono;

        return $this;
    }

    /**
     * Get the value of id
     */ 
    public function getFoto_perfil()
    {
        return $this->foto_perfil;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */ 
    public function setFoto_perfil($foto_perfil)
    {
        $this->foto_perfil = $foto_perfil;

        return $this;
    }

    /**
     * Get the value of id
     */ 
    public function getTipo_usuario()
    {
        return $this->tipo_usuario;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */ 
    public function setTipo_usuario($tipo_usuario)
    {
        $this->tipo_usuario = $tipo_usuario;

        return $this;
    }

    /**
     * Get the value of id
     */ 
    public function getDireccion()
    {
        return $this->direccion;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */ 
    public function setDireccion($direccion)
    {
        $this->direccion = $direccion;

        return $this;
    }

    /**
     * Get the value of id
     */ 
    public function getFavorito()
    {
        return $this->favorito;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */ 
    public function setFavorito($favorito)
    {
        $this->favorito = $favorito;

        return $this;
    }

    /**
     * Get the value of id
     */ 
    public function getSuspendido()
    {
        return $this->suspendido;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */ 
    public function setSuspendido($suspendido)
    {
        $this->suspendido = $suspendido;

        return $this;
    }


}