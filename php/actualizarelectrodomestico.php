<?php
include('database.php');
$idelectrodomestico = $_POST['idelectrodomestico'];
$nombre = $_POST['nombre'];
$ubicacion = $_POST['ubicacion'];
$estado = $_POST['estado'];
$query = "UPDATE `electrodomestico` SET `nombre`='$nombre',`ubicacion`='$ubicacion',`estado`='$estado' WHERE `idelectrodomestico` = '$idelectrodomestico';";
$result = mysqli_query($connection, $query);
if (!$result) {
    die('Actualizado error ' . mysqli_error($connection));
}
echo "Actualizacion correcta";