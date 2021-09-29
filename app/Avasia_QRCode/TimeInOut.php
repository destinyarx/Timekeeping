<?php
	date_default_timezone_set('Asia/Manila');
    session_start();
    $server = "localhost";
    $username="root";
    $password="";
    $dbname="dbfaceapi";

    $conn = new mysqli($server,$username,$password,$dbname);

    if($conn->connect_error){
        die("Connection failed" .$conn->connect_error);
    }

    if(isset($_POST['employeeID'])){
        
        $employeeID =$_POST['employeeID'];
		$date = date('Y-m-d');
		$time = date('H:i:s A');

		$sql = "SELECT * FROM employee WHERE emp_id = '$employeeID'";
		$query = $conn->query($sql);

		if($query->num_rows < 1){
			$_SESSION['error'] = 'Cannot find QRCode number '.$employeeID;
		}else{
				$row = $query->fetch_assoc();
				$id = $row['emp_id'];
				$sql ="SELECT * FROM attendance WHERE emp_id='$id' AND logdate='$date' AND type='0'";
				$query=$conn->query($sql);
				if($query->num_rows>0){
                    $sql = "UPDATE attendance SET time_out='$time', type='1' WHERE emp_id='$employeeID' and logdate='$date'";
                    $query=$conn->query($sql);
                    $_SESSION['success'] = 'Successfuly Time Out: '.$row['emp_id'];
			    }else{
					$sql = "INSERT INTO attendance(emp_id,time_in,logdate,type) VALUES('$employeeID','$time','$date','0')";
					    if($conn->query($sql) ===TRUE){
					        $_SESSION['success'] = 'Successfuly Time In: '.$row['emp_id'];
			            }else{
			             $_SESSION['error'] = $conn->error;
		   }	
		}
	}

	}else{
		$_SESSION['error'] = 'Please scan your QR Code number';
}
header("location: index.php");
	   
$conn->close();
