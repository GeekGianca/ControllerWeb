<?php
include('database.php');
$id = $_POST['codigo'];
$query = "SELECT * FROM `electrodomestico` WHERE `idelectrodomestico` = '$id'";
$result = mysqli_query($connection, $query);
if (!$result) {
    die('Error de seleccion ' . mysqli_error($connection));
}
$response = array();
while ($row = mysqli_fetch_array($result)) {
    $response[] = array(
        'idelectrodomestico' => $row['idelectrodomestico'],
        'nombre' => $row['nombre'],
        'ubicacion' => $row['ubicacion'],
        'estado' => $row['estado']
    );
};
$respo = json_encode($response[0]);
echo $respo;