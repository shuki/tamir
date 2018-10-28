<?php
class request
{
	public static function set(&$request)
	{
		if($request['_session_jset_user_group_'] > 1){
			switch($request['_source_']){
				case 'patient':
				case 'medical':
					switch($request['_session_jset_user_group_']){
						case '3':
							$request['_section_'] = 3;
							break;
						default:
							$request['_section_'] = 1;
					}
					break;
				case 'dormitory':
				case 'shift_summary':
				case 'school':
				case 'worker':
				case 'exceptional_event_main':
				case 'exceptional_event_involved_main':
				case 'exceptional_event_worker_main':
				case 'report':
					$request['_section_'] = 1;
					break;
				default:
					;
			}
		}
	}
}