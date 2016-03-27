<?php
class request
{
	public static function set(&$request)
	{
		if($request['_session_jset_user_group_'] > 1){
			switch($request['_source_']){
				case 'dormitory':
				case 'patient':
				case 'shift_summary':
				case 'school':
				case 'medical':
				case 'worker':
					$request['_section_'] = 1;
					break;
				default:
					;
			}
		}
	}
}