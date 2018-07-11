<?php
ini_set('display_errors', 1);
include_once("autoload.php");
if(!$_REQUEST['report_verification'] || !defined('config::report_verification') || $_REQUEST['report_verification'] != config::report_verification)
	jset_login::verify('../');

call_user_func(array(new report(), 'process'), $_REQUEST);
