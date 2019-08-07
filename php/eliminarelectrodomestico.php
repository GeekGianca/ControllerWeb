<?php
    include ('database.php');
    if (isset($_POST['datoid'])){
        $idelectrodomestico = $_POST['datoid'];
        $query = "DELETE FROM `electrodomestico` WHERE `idelectrodomestico` ='$idelectrodomestico'";
        $result = mysqli_query($connection, $query);
        if (!$result){
            die('Query Eliminar Error '.mysqli_error($connection));
        }
        echo "Electrodomestico eliminado correctamente!";
    }
