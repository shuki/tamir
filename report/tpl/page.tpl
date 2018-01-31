{* Smarty *}
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
{if !$request->contentsonly}
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=utf-8" />
<META HTTP-EQUIV="CACHE-CONTROL" CONTENT="NO-CACHE"/>
<META HTTP-EQUIV="EXPIRES" CONTENT="-1"/>
<link rel="shortcut icon" href="../../jxset/jset/img/smile.gif" type="image/x-icon" />
<title>{if $error}Error in report{else}{$title}{/if}</title>
<!--link rel="stylesheet" type="text/css" media="all" href="css/style.css" /-->
<script src="../../jxset/jset/jquery/jquery-1.8.2.min.js" type="text/javascript"></script>
<script src="js/reporting.js" type="text/javascript"></script>
{/if}
<style>
{include file="css/style.css"}
</style>
</head>

<body dir="rtl">
{*include file="tpl/content.tpl"*}
{include file="$tpl_name"}
</body>

