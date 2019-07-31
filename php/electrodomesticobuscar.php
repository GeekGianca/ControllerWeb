<?php
    include ('database.php');
    $search = $_POST['search'];
    if (!empty($search)){
        $select = "SELECT * FROM `electrodomestico` WHERE `idelectrodomestico` LIKE '$search%' OR `nombre` LIKE '$search%'";
        $result = mysqli_query($connection, $select);
        if (!$result){
            die('Error de busqueda'. mysqli_error($connection));
        }
        $resp = array();
        while ($row = mysqli_fetch_array($result)) {
            $resp[] = array(
                'idelectrodomestico' => $row['idelectrodomestico'],
                'nombre' => $row['nombre'],
                'ubicacion' => $row['ubicacion'],
                'estado' => $row['estado']
            );
        }
        $respstring = json_encode($resp);
        echo $respstring;
    }