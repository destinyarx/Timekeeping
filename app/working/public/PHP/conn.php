<?php


$host = "localhost";
$dbUser = "root";
$dbPassword = "";
$dbName = "dbfaceapi";

/* Establishing the connection to the database using mysqli_connect(hostname, user, password, database name);*/

try{  
    $connect = new PDO("mysql:host=$host;dbname=$dbName",$dbUser,$dbPassword);  
     
} catch(Exception $e){  
Echo "Connection failed" . $e->getMessage();  
}  

?>