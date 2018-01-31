<?php
include_once 'config_mailer.class.php';
require '../../../phpmailer/PHPMailerAutoload.php';

class mailer
{	
	public static function mail($to, $subject, $body, $attachment = null, $params = null)
	{
		//var_dump($params);
		//die;
		//SMTP needs accurate times, and the PHP time zone MUST be set
		//This should be done in your php.ini, but this is how to do it if you don't have access to that
		date_default_timezone_set(config_mailer::timezone);
		
		//Create a new PHPMailer instance
		$mail = new PHPMailer;
		
		//Encoding
		$mail->CharSet = 'UTF-8';
		
		//Tell PHPMailer to use SMTP
		$mail->isSMTP();
		
		//Enable SMTP debugging
		// 0 = off (for production use)
		// 1 = client messages
		// 2 = client and server messages
		$mail->SMTPDebug = config_mailer::SMTPDebug;
		
		//Ask for HTML-friendly debug output
		$mail->Debugoutput = config_mailer::Debugoutput;
		
		//Set the hostname of the mail server
		$mail->Host = config_mailer::Host;
		// use
		// $mail->Host = gethostbyname('smtp.gmail.com');
		// if your network does not support SMTP over IPv6
		
		//Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
		$mail->Port = config_mailer::Port;
		
		if($mail->Port != 25)
			//Set the encryption system to use - ssl (deprecated) or tls
			$mail->SMTPSecure = config_mailer::SMTPSecure;
		
		//Whether to use SMTP authentication
		$mail->SMTPAuth = config_mailer::SMTPAuth;
		
		if($mail->SMTPAuth){
			//Username to use for SMTP authentication - use full email address for gmail
			$mail->Username = config_mailer::Username;
			
			//Password to use for SMTP authentication
			$mail->Password = config_mailer::Password;
		}
		//Set who the message is to be sent from
		$mail->setFrom(($params->From ? $params->From : config_mailer::From), config_mailer::FromName);
		
		//Set an alternative reply-to address
		$mail->addReplyTo(($params->Reply ? $params->Reply : config_mailer::Reply), config_mailer::ReplyName);
		
		//Set who the message is to be sent to
		$mail->addAddress($to, $to);
		
		//Set the subject line
		$mail->Subject = $subject;
		
		//Read an HTML message body from an external file, convert referenced images to embedded,
		//convert HTML into a basic plain-text alternative body
		//$mail->msgHTML(file_get_contents('contents.html'), dirname(__FILE__));
		$mail->msgHTML($body);
		
		//Replace the plain text body with one created manually
		$mail->AltBody = $body;
		
		//Attach a file
		if($attachment)
			$mail->addAttachment('../../'. $attachment);
		
		//send the message, check for errors
		$result = new stdClass;
		
		if (!$mail->send()) {
			$result->error = $mail->ErrorInfo;
		} else {
			$result = true;
		}
		
		return $result;
	}
}