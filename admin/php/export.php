<?php
session_start();
$server = "localhost";
$username="root";
$password="";
$dbname="dbfaceapi";

$conn = new mysqli($server,$username,$password,$dbname);

if($conn->connect_error){
    die("Connection failed" .$conn->connect_error);
}
$filename = 'AttenadanceRecord-'.date('Y-m-d').'.csv';

$query = "SELECT * FROM attendance";
$result = mysqli_query($conn,$query);

$array = array();

$file = fopen($filename,"w");
$array = array("ID","EMPLOYEE ID","TIME IN ","TIME OUT","LOG DATE","TYPE","STATUS");
fputcsv($file,$array);

while($row = mysqli_fetch_array($result)){
    $ID =$row['id'];
    $EMPLOYEEID =$row['emp_id'];
    $TIMEIN =$row['time_in'];
    $TIMEOUT =$row['time_out'];
    $LOGDATE =$row['logdate'];
    $TYPE =$row['type'];
    $STATUS =$row['status'];

    $array = array($ID,$EMPLOYEEID,$TIMEIN,$TIMEOUT,$LOGDATE,$TYPE,$STATUS);
    fputcsv($file,$array);
}
fclose($file);

header("Content-Description: File Transfer");
header("Content-Disposition: Attachment; filename=$filename");
header("Content-type: application/csv;");
readfile($filename);
unlink($filename);

exit();

header('Location: ../../../admin_login/report/export.html');