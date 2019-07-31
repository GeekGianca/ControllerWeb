<?php
    include ('database.php');
    $query = "SELECT * FROM `electrodomestico`;";
    $result = mysqli_query($connection, $query);
    if (!$result){
        die('Query error!'.mysqli_error($connection));
    }
    $response = array();
    while($row = mysqli_fetch_array($result)){
        $response[] = array(
            'idelectrodomestico' => $row['idelectrodomestico'],
            'nombre' => $row['nombre'],
            'ubicacion' => $row['ubicacion'],
            'estado' => $row['estado']
        );
    }
    $jsonstring = json_encode($response);
    echo $jsonstring;