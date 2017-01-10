<?php

class hebrew
{
	public static function get_hebrew_date($date)
	{
		$arr = explode('-', $date);
		if(count($arr) == 3)
			$str = jdtojewish(gregoriantojd($arr[1], $arr[2], $arr[0]), true, CAL_JEWISH_ADD_GERESHAYIM);
		else {
			$arr = explode('/', $date);
			if(count($arr) == 3)
				$str = jdtojewish(gregoriantojd($arr[1], $arr[0], $arr[2]), true, CAL_JEWISH_ADD_GERESHAYIM);
			else
				return '';
		} 
		return iconv ('WINDOWS-1255', 'UTF-8', $str);
	}
}