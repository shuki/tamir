<?php
/*
 * jset  1.0 - jset
 * Copyright (c) 2010, Shuki Shukrun (shukrun.shuki at gmail.com).
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Date: 2010-01-01
 */

class config
{
	const version = '1.0.8';
	const jxset = '../jxset/';
	const rel_path = '../../';
	const dbhost = '127.0.0.1';
	const dbport = '3306';
	const dbserver = 'mysql';
	const dbcharset = 'utf8';
	const dbname = 'tamir';
	const dbuser   = 'root';
	const dbpassword = ''; 
	
	const dbfetchStyle = PDO::FETCH_OBJ;
	const dberrorMode = PDO::ERRMODE_EXCEPTION;
	const dbtime_zone = '+03:00'; // 'SYSTEM'
	const limit = 100;
	const upload_directory = '../../uploads/';
	const mysql_rel_path = '../../uploads/';
	const hosts_table = 'jset_host';

	const login = true;
	const session = 'tamir';
	const login_page = 'login.php';
	const start_page = 'index.php';
	const password_page = 'password.php';
	const user_table = 'v_worker_session';
	const encrypt_salt = 't2H3';
	const password_reset = '1234';
	
	const mysqldump_prefix = '';
	const errorLogFile = 'log/error_log_file.txt';

	const export_limit = 150;
	const no_export_limit = 1000000;	
	const export_charset_windows = 'Windows-1255';
	
	const join_list_suffix = '_jxlist';
	const join_field_suffix = '_jxfield';
	
	// for report
	const dbname_default = 'tamir';
	const tpl = 'page.tpl';
}
