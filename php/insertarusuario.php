<?php
include('database.php');
if (isset($_POST['uid']) &&isset($_POST['correo']) && isset($_POST['contrasena'])) {
    $uid = $_POST['uid'];
    $correo = $_POST['correo'];
    $contrasena = $_POST['contrasena'];

    $query = "INSERT INTO `usuario`(`idusuario`,`correo`, `contrasena`, `usuariobloqueado`) VALUES ('$uid','$correo','$contrasena',1);";
    $result = mysqli_query($connection, $query);
    if (!$result) {
        die('Query Fallo!');
    }
    echo "Usuario registrado exitosamente!";
}