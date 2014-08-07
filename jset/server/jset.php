<?php
include('autoload.php');

$request = jset_dispatch::get_real_POST_GET();
if(defined('config::version') && config::version != $request['_version_']){
	$version = config::version;
	$result->error->type = "version";
	$result->error->message = "version";
	echo json_encode($result);
	die;
}

$result = jset_dispatch::get($request);

if($request['_methods_'] == 'export'){
	header('Content-disposition: attachment; filename=' . $request['_source_'] . '.csv');
	header('Content-type: text/csv');
}

echo $result;