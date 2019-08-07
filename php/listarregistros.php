<?php
include ('database.php');
$query = "SELECT `usuario`.`correo`, `registrodeusuario`.`horadeentrada`, `registrodeusuario`.`fechadeentrada` FROM `usuario` INNER JOIN `registrodeusuario` ON `usuario`.`idusuario` = `registrodeusuario`.`usuario_idusuario`;";
$result = mysqli_query($connection, $query);
if (!$result){
    die('Query error!'.mysqli_error($connection));
}
$response = array();
while($row = mysqli_fetch_array($result)){
    $response[] = array(
        'correo' => $row['correo'],
        'horadeentrada' => $row['horadeentrada'],
        'fechadeentrada' => $row['fechadeentrada']
    );
}
$jsonstring = json_encode($response);
echo $jsonstring;