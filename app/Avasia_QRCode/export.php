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
$filename = 'AttendanceRecord-'.date('Y-m-d').'.csv';

$query = "SELECT * FROM attendance";
$result = mysqli_query($conn,$query);

$array = array();

$file = fopen($filename,"w");
$array = array("ID","EMPLOYEE ID","TIME IN ","TIME OUT","LOG DATE","STATUS");
fputcsv($file,$array);

while($row = mysqli_fetch_array($result)){
    $ID =$row['ID'];
    $EMPLOYEEID =$row['EMPLOYEEID'];
    $TIMEIN =$row['TIMEIN'];
    $TIMEOUT =$row['TIMEOUT'];
    $LOGDATE =$row['LOGDATE'];
    $STATUS =$row['STATUS'];

    $array = array($ID,$EMPLOYEEID,$TIMEIN,$TIMEOUT,$LOGDATE,$STATUS);
    fputcsv($file,$array);
}
fclose($file);

header("Content-Description: File Transfer");
header("Content-Disposition: Attachment; filename=$filename");
header("Content-type: application/csv;");
readfile($filename);
unlink($filename);
exit();

