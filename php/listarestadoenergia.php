<?php
include ('database.php');
$query = "SELECT `usuario`.`correo`, `electrodomestico`.`nombre`, `gestordeuso`.`fechadelevento`, `gestordeuso`.`horadelevento`, `gestordeuso`.`tipodelevento` FROM ((`usuario` INNER JOIN `electrodomestico` ON `usuario`.`idusuario` = `electrodomestico`.`usuario_idusuario`) INNER JOIN `gestordeuso` ON `electrodomestico`.`idelectrodomestico` = `gestordeuso`.`fkelectrodomestico`);";
$result = mysqli_query($connection, $query);
if (!$result){
    die('Query error!'.mysqli_error($connection));
}
$response = array();
while($row = mysqli_fetch_array($result)){
    $response[] = array(
        'correo' => $row['correo'],
        'nombre' => $row['nombre'],
        'fechadelevento' => $row['fechadelevento'],
        'horadelevento' => $row['horadelevento'],
        'tipodelevento' => $row['tipodelevento']
    );
}
$jsonstring = json_encode($response);
echo $jsonstring;