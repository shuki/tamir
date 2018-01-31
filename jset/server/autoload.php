<?php
define('JSET_SERVER_CLASS_PATH', 'jset/server/class/');
define('RELATIVE_PATH_TO_ROOT', '../../');

include_once(RELATIVE_PATH_TO_ROOT . JSET_SERVER_CLASS_PATH . "config.class.php");
ini_set("log_errors" , "1");
ini_set("error_log" , RELATIVE_PATH_TO_ROOT . config::errorLogFile);
ini_set("display_errors" , "1"); // set to 0 in production
if(defined('E_DEPRECATED'))
	ini_set('error_reporting', E_ALL & ~E_NOTICE & ~E_STRICT & ~E_WARNING & ~E_DEPRECATED);
else
	ini_set('error_reporting', E_ALL & ~E_NOTICE & ~E_STRICT & ~E_WARNING);


function jsetAutoload($classname)
{
	if (is_file(RELATIVE_PATH_TO_ROOT . JSET_SERVER_CLASS_PATH . $classname . '.class.php'))
		require_once RELATIVE_PATH_TO_ROOT . JSET_SERVER_CLASS_PATH . $classname . '.class.php';
	else if (is_file(RELATIVE_PATH_TO_ROOT . config::jxset . JSET_SERVER_CLASS_PATH . $classname . '.class.php'))
		require_once RELATIVE_PATH_TO_ROOT . config::jxset . JSET_SERVER_CLASS_PATH . $classname . '.class.php';
}

if (version_compare(PHP_VERSION, '5.1.2', '>=')) {
	//SPL autoloading was introduced in PHP 5.1.2
	if (version_compare(PHP_VERSION, '5.3.0', '>=')) {
		spl_autoload_register('jsetAutoload', true, true);
	} else {
		spl_autoload_register('jsetAutoload');
	}
} else {
	/**
	 * Fall back to traditional autoload for old PHP versions
	 * @param string $classname The name of the class to load
	 */
	function __autoload($classname)
	{
		jsetAutoload($classname);
	}
}


/*
function __autoload($class_name) {
	if (is_file(RELATIVE_PATH_TO_ROOT . JSET_SERVER_CLASS_PATH . $class_name . '.class.php'))
		require_once RELATIVE_PATH_TO_ROOT . JSET_SERVER_CLASS_PATH . $class_name . '.class.php';
	else if (is_file(RELATIVE_PATH_TO_ROOT . config::jxset . JSET_SERVER_CLASS_PATH . $class_name . '.class.php'))
		require_once RELATIVE_PATH_TO_ROOT . config::jxset . JSET_SERVER_CLASS_PATH . $class_name . '.class.php';
}
*/