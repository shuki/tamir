<?php

class data_format
{
	public static function get_hebrew_date($data)
	{
		$hebrew_date = hebrew::get_hebrew_date($data->aggregate[0]->now);
		$data->hebrew_now = $hebrew_date;
		return $data;
	}
}