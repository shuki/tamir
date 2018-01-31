<?php
include_once 'autoload.php';
include_once 'class/mailer.class.php';
ini_set('max_execution_time', 0);

$q = "select id, name, email
from v_worker
where v_worker.`group` = 1
and email is not null";

$qreports = "select *
from report
where id = 36";
//--------------------------------------------------

header( 'Content-type: text/html; charset=utf-8' );
$db = db::create();

$db->query($q);	
$mail_messages = array();
while ($row = $db->fetch())
	$mail_messages[] = $row;
var_dump($mail_messages);

$db->query($qreports);
$reports = array();
while ($row = $db->fetch())
	$reports[] = $row;
var_dump($reports);

$results = array();
foreach($reports as $report){
	$db->query($report->sql);
	$results[] = $db->fetchAll();
}

var_dump($results);

$ch = curl_init();
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_URL, 'http://localhost/tamir/report/?reportId=36&nobuttons=1');
$body = curl_exec($ch);
curl_close($ch);
echo $body;
$params->From = 'shukrun.shuki@gmail.com';
$params->Reply = 'shukrun.shuki@gmail.com';
$result = mailer::mail('shukrun.shuki@gmail.com','=?UTF-8?B?'.base64_encode('testing reports').'?=', $body, null, $params);
var_dump($result);
die;
$params = new stdClass;
foreach($mail_messages as $mail_message){
	echo date("d/m/Y H:i:s") . ' ';
	$body = str_replace(array('#NAME#', '#CODE#', '#FOLDER#', '#SUPPORT_EMAIL#'), array($mail_message->name, ($mail_message->submitted ? substr($mail_message->code, 0, 10) : $mail_message->code), $mail_message->folder, $mail_message->support_email), $mail_message->email_body);
	$type = ($mail_message->submitted ? 2 : 1);

	$params->From = $mail_message->support_email;
	$params->Reply = $mail_message->support_email;
	
	$result = mailer::mail($mail_message->email,'=?UTF-8?B?'.base64_encode($mail_message->email_subject).'?=', $body, null, $params);
	
	$sent = ($result === true ? 1 : 0);
	if($result === true)
		$error = null;
	else
		$error = $result->error;
		
	echo "tender id: {$mail_message->id}, message subject: {$mail_message->email_subject}, result: {$sent}\n";
	$db->insert("INSERT INTO `email` (`parent`, `type`, `address`, `subject`, `body`, `result`, `sent`)
	select ?,?,?,?,?,?,?",
	array($mail_message->id, $type, $mail_message->email, $mail_message->email_subject, $body, $error, $sent));

	$mail_message = null;
	echo "\n";
}
	