<?php
ini_set('display_errors', 1);
include_once("autoload.php");
call_user_func(array(new report(), 'process'), $_REQUEST);
