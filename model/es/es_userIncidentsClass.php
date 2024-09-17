<?php

class es_userIncidentsClass
{
    protected $id_incidencia;
    protected $razon;
    protected $correo;
    protected $detalles;
    protected $fecha_incidencia;
    protected $solucionado;

    /**
     * Get the value of id
     */ 
    public function getId_incidencia()
    {
        return $this->id_incidencia;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */ 
    public function setId_incidencia($id_incidencia)
    {
        $this->id_incidencia = $id_incidencia;

        return $this;
    }

    /**
     * Get the value of id
     */ 
    public function getRazon()
    {
        return $this->razon;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */ 
    public function setRazon($razon)
    {
        $this->razon = $razon;

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
    public function getDetalles()
    {
        return $this->detalles;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */ 
    public function setDetalles($detalles)
    {
        $this->detalles = $detalles;

        return $this;
    }

    /**
     * Get the value of id
     */ 
    public function getFecha_incidencia()
    {
        return $this->fecha_incidencia;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */ 
    public function setFecha_incidencia($fecha_incidencia)
    {
        $this->fecha_incidencia = $fecha_incidencia;

        return $this;
    }

    /**
     * Get the value of id
     */ 
    public function getSolucionado()
    {
        return $this->solucionado;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */ 
    public function setSolucionado($solucionado)
    {
        $this->solucionado = $solucionado;

        return $this;
    }

    

}