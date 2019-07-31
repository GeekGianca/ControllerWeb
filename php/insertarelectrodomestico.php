<?php
    include ('database.php');
    if (isset($_POST['nombre']) && isset($_POST['ubicacion']) && isset($_POST['estado']) && isset($_POST['idusuario'])){
        $nombre = $_POST['nombre'];
        $ubicacion = $_POST['ubicacion'];
        $estado =$_POST['estado'];
        $idusuario = $_POST['idusuario'];
        $query = "INSERT INTO `electrodomestico`(`nombre`, `ubicacion`, `estado`, `usuario_idusuario`) VALUES ('$nombre','$ubicacion','$estado','$idusuario');";
        $result = mysqli_query($connection, $query);
        if (!$result){
            die('Query Fallo!');
        }
        echo "Se registro el electrodomestico correctamente!";
    }