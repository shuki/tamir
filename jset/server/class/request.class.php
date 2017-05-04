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
				case 'report':
				case 'medical':
				case 'worker':
				case 'exceptional_event_main':
				case 'exceptional_event_involved_main':
				case 'exceptional_event_worker_main':
					$request['_section_'] = 1;
					break;
				default:
					;
			}
		}
	}
}