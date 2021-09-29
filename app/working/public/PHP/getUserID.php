
<?php

require("conn.php");

$sql = "SELECT * FROM employee";


$q = $connect->query($sql);
$q->setFetchMode(PDO::FETCH_ASSOC);

$data = array();
while ($row = $q->fetch()):
    
    
    $name = $row['emp_id'];

    array_push($data, $name);
  
endwhile;
header('Content-type: application/json');
echo json_encode($data);

exit();
?>



