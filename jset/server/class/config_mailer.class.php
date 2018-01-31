<?php
/*
 * jset  1.0 - jset
 * Copyright (c) 2010, Shuki Shukrun (shukrun.shuki at gmail.com).
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Date: 2010-01-01
 */

class config_mailer
{
	//SMTP needs accurate times, and the PHP time zone MUST be set
	//This should be done in your php.ini, but this is how to do it if you don't have access to that
	const timezone = 'Asia/Jerusalem';
	//Enable SMTP debugging
	// 0 = off (for production use)
	// 1 = client messages
	// 2 = client and server messages
	const SMTPDebug = 0;
	
	//Ask for HTML-friendly debug output
	const Debugoutput = 'html';
	
	//Set the hostname of the mail server
	//const Host = 'smtp.gmail.com';
	const Host = 'localhost';
	// use
	// const Host = gethostbyname('smtp.gmail.com');
	// if your network does not support SMTP over IPv6
	
	//Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
	//const Port = 587;
	const Port = 25;
	
	//Set the encryption system to use - ssl (deprecated) or tls
	//const SMTPSecure = 'tls';
	
	//Whether to use SMTP authentication
	//const SMTPAuth = true;
	const SMTPAuth = false;
	
	//Username to use for SMTP authentication - use full email address for gmail
	//const Username = "jxsetmailer@gmail.com";
	
	//Password to use for SMTP authentication
	//const Password = "BagaBondi69&$";
	
	//Set who the message is to be sent from
	//const From = 'support_in13@nisha.co.il';
	const FromName = 'Tamir';
		
	//Set an alternative reply-to address
	//const Reply = 'support_in13@nisha.co.il';
	const ReplyName = 'Tamir';
}
