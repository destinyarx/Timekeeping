<?php
require_once "functions.loader.php";	
date_default_timezone_set("Asia/Manila");

$app = new Slim();

$app->get("/test", function() {
    echo "Test! " . date("Y-m-d h:i:s A");
});

$app->run();