<?php

class tamir
{
	public static function create_plan_cares($db, $id, $issues)
	{
		if(!$issues)
			return 0;
		
		$i = 0;
		$issues_array = explode(',', $issues);
		foreach($issues_array as $issue){
			$db->query('select count(*) as result from plan_care where parent_sub = ? and issue = ?', array($id, $issue));
			if(!$db->fetch()->result){
				$db->insert('INSERT INTO `plan_care` (`parent_sub`,`issue`) VALUES (?,?)', array($id, $issue));
				$i++;
			}
		}
		
		return $i;
	}
	
	public static function create_exceptional_event_involved($db, $id, $patient_id)
	{
		return $db->insert('INSERT INTO `exceptional_event_involved` (`sub_parent`, `patient_id`) VALUES (?,?)', array($id, $patient_id));
	}
	
	public static function create_patient_attendant($db, $id, $span)
	{
		return $span == 1 ? $db->insert('INSERT IGNORE INTO `patient_attendant` (`parent`, `patient_id`, `attendant`) select ss.id, v_patient.id, 1 from v_patient, (select * from shift_summary where id = ?) ss where v_patient.house = ss.house and v_patient.active = 1', array($id)) : false;
	}
	
	public static function create_worker_attendant($db, $id)
	{
		return $db->insert('INSERT IGNORE INTO `worker_attendant` (`parent`, `worker_id`, `attendant`) select ss.id, worker.id, 1 from worker, (select * from shift_summary where id = ?) ss where worker.id = ss.creator', array($id));
	}
	
	public static function get_user_dormitory($db, $settings)
	{
		if(!isset($settings->_session_jset_user_login_))
			return '';
		
		$query = "SELECT dormitory FROM worker WHERE login = ? LIMIT 1";
		
		$db->query($query, array($settings->_session_jset_user_login_));
		return $db->fetch()->dormitory;
	}
	
	public static function get_user_house($db, $settings)
	{
		if(!isset($settings->_session_jset_user_login_))
			return '';
		
		$query = "SELECT house FROM worker WHERE login = ? LIMIT 1";
		
		$db->query($query, array($settings->_session_jset_user_login_));
		return $db->fetch()->house;
	}

	public static function reset_password($db, $id)
	{	
		$query = "UPDATE worker set `password` = AES_ENCRYPT(?,?) WHERE id = ? LIMIT 1";
		return $db->exec($query, array(config::password_reset, config::encrypt_salt, $id));
	}
	
	public static function delete_reporting_items($db, $id, $file){
		$query = "select `file` from reporting WHERE id = ? LIMIT 1";
		$db->query($query, array($id));
		if($db->fetch()->file == $file)
			return true;

		$query = "delete from reporting_item WHERE parent = ?";
		return $db->exec($query, array($id));
	}
}