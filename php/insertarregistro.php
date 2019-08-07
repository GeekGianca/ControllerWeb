<?php
include('database.php');
if (isset($_POST['uid'])) {
    $uid = $_POST['uid'];
    $query = "INSERT INTO `registrodeusuario`(`usuario_idusuario`, `horadeentrada`, `fechadeentrada`) VALUES ('$uid',(SELECT CURRENT_TIME),(SELECT CURRENT_DATE));";
    $result = mysqli_query($connection, $query);
    if (!$result) {
        die('Query Fallo!');
    }else {
        echo "Usuario registrado exitosamente!";
    }
}