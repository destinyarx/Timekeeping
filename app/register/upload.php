<?php


// Return image url
$i = 1;
$folder = "System123";
$path = "../working/labeled_images/";

if(isset($_POST['imageURL']))
{
   mkdir($path.$folder);
    $uid = $_POST['imageURL'];
    $num = $_POST['num'];
    

    $image = imagecreatefromjpeg($uid);
    imagejpeg($image, $path .$folder."/".$num.".jpg");
    //imagejpeg($image, "labeled_images/".$folder."/".$num.".jpg");
    $i++;
    
}