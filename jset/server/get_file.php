<?php 
include('autoload.php');
const default_local_files_directory = '../../files/';
const files_relative_to_root = '../';

jset_login::verify(files_relative_to_root);

if(defined('config::local_files_directory') && defined('config::remote_files_directory'))
	$file_url = file_exists(config::local_files_directory . $_GET['filename']) ? config::local_files_directory . $_GET['filename'] : (file_exists(config::remote_files_directory . $_GET['filename']) ? config::remote_files_directory . $_GET['filename'] : false );
else
	$file_url = default_local_files_directory . $_GET['filename'];

if(!$file_url){
	header($_SERVER["SERVER_PROTOCOL"]." 404 Not Found", true, 404);
	echo 'file not found';
	exit;
}

$mime_content_type = mime_content_type($file_url);
header("Content-type: $mime_content_type");
header("Content-disposition: inline; filename=\"" . basename($file_url) . "\"");
readfile($file_url);