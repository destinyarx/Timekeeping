<?php



$host = "localhost";
$dbUser = "root";
$dbPassword = "";
$dbName = "dbfaceapi";

/* Establishing the connection to the database using mysqli_connect(hostname, user, password, database name);*/

try{  
    $connect = new PDO("mysql:host=$host;dbname=$dbName",$dbUser,$dbPassword);  
    $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch(Exception $e){  
Echo "Connection failed" . $e->getMessage();  
}  

?>


