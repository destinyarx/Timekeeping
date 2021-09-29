
<?php
/*
    require('conn.php');
 
    $time = date('H:i:s');
    $date = date('Y-m-d');

   $userID    = "Prashant Kumar";

    
   $id    = $_POST['id'];
   $fname = $_POST['fname'];
   $mname = $_POST['mname'];
   $lname = $_POST['lname'];
  

   $sql = " INSERT INTO employee (id,emp_id,fname,mid_init,lname,img,date_created,date_modified) VALUES(null,'$id','$fname','$mname','$lname','','$date','$date')";

    try{
       if($connect->exec($sql)){
          echo "New record created successfully";
       }
    }catch(PDOException $e) {
        echo $sql . "<br>" . $e->getMessage();
    }
    
*/



// pang sign-in / sign-out/ pang validate ng regsitration
require("conn.php");
header('Content-type: application/json');

$time = date('H:i:s');
$date = date('Y-m-d');


$userID  = $_POST['id'];
$command = $_POST['command'];




// LAGYAN NG VALIDATION
$sql = $connect->prepare("SELECT id,time_out FROM attendance WHERE emp_id = '$userID' AND logdate = '$date' ORDER BY id DESC LIMIT 1; ");
    
try{
    $sql->execute();
    $result = $sql->fetchAll(PDO::FETCH_ASSOC);

    if(!$result) {

            $sql = " INSERT INTO attendance (id, emp_id, time_in, time_out,logdate,type,status) VALUES(NULL,'$userID','$time','','$date',0,'0')";
            
            try{
               if($connect->exec($sql)) { echo "New record created successfully";}
            }catch(PDOException $e) {
                echo $sql . "<br>" . $e->getMessage();
            }

    }else{ 

        foreach ($result as $record) {
            $lastID = $record['id'];
            $time_out = $record['time_out'];
            
        }
      
        if($time_out != ""){
            
            // time-in ka ulit kasi na time-in/out kana kanina 
            $sql = " INSERT INTO attendance (id,emp_id, time_in, time_out,logdate,type,status) VALUES(NULL,'$userID','$time','','$date',0,'0')";
            $connect->exec($sql);
        }else{
            
            // time-out kana // dagdagan ng type
            $sql = "UPDATE attendance SET time_out='$time' WHERE emp_id = '$userID' AND  logdate = '$date' AND id = '$lastID' ";
            $connect->exec($sql);
        }
    }
}catch(PDOException $e) {echo $sql . "<br>" . $e->getMessage();} 

if( $command == 'register' ){
    //get data
    
    $id    = $_POST['id'];
    $fname = $_POST['fname'];
    $mname = $_POST['mname'];
    $lname = $_POST['lname'];
    
    
    // last part ng register pag successful lahat dito na ipapasok ung insert ng mysql query
    // time-in ka ulit kasi na time-in/out kana kanina 
    $sql = "UPDATE attendance SET time_out='$time' WHERE emp_id = '$userID' AND  logdate = '$date' AND id = '$lastID' ";
    $connect->exec($sql);
}





?>
