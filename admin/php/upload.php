<?php


// Return image url
$i = 1;
$path = "../../app/working/labeled_images/";



if(isset($_POST['imageURL']))
{
   
    $uid    = $_POST['imageURL'];
    $folder = $_POST['id'];
    $num    = $_POST['num'];
    mkdir($path.$folder);


    $image = imagecreatefromjpeg($uid);
    imagejpeg($image, $path.$folder."/".$num.".jpg");
    //imagejpeg($image, "labeled_images/".$folder."/".$num.".jpg");
    $i++;
       
}