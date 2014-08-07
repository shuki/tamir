{* Smarty *}
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=utf-8" />
<META HTTP-EQUIV="CACHE-CONTROL" CONTENT="NO-CACHE"/>
<META HTTP-EQUIV="EXPIRES" CONTENT="-1"/>
<link rel="shortcut icon" href="../../jxset/jset/img/smile.gif" type="image/x-icon" />
<title>{if $error}Error in report{else}{$title}{/if}</title>
<link rel="stylesheet" type="text/css" media="all" href="css/style.css" />
<script src="../../jxset/jset/jquery/jquery-1.8.2.min.js" type="text/javascript"></script>
<script src="js/reporting.js" type="text/javascript"></script>
</head>

<body dir="rtl">
{if $error}
<div dir="ltr">
<h3 style="color:red">Error in report</h3>
{$error}<br />
{$error_msg}<br />
{$error_dump}
</div>
{else}
<h1>{$description}</h1>
<form>
<table>
<tr style="display:none;"><td colspan="2"><input type="text" name="reportId"  value="{$reportId}" /></td></tr>
{foreach from=$parameters->fields key=k item=row}
<tr {if !$row->value}style="background-color:yellow"{/if}>
<td>{$row->title}</td>
{if isset($row->list)}
<td>
    {html_options name=$row->name options=$row->list selected=$row->value} 
</td>
{else}
<td><input type="text" name="{$row->name}" value="{$row->value}" /></td>
{/if}
</tr>	
{/foreach}
{if $parameters->interactive}
<tr style="display:none;"><td colspan="2"><input type="text" name="interactive"  value="1" /></td></tr> 
{/if}
<tr><td colspan="2"><input type="submit" value="הרץ דוח" /></td></tr>
</table>
</form>	
<br />

{if $report->actionParamName}
	<table>
	<tr {if !$action_parameter->value}style="background-color:yellow"{/if}>
	<td>{$action_parameter->title}</td>
	{if isset($action_parameter->list)}
	<td>
	    {html_options name=action_parameter options=$action_parameter->list selected=$action_parameter->value}
	    <script type="text/javascript">
	    	{*foreach from=$action_parameter->list_extra key=x item=xrow*}
	    	var action_parameter_list_extra_array = {$action_parameter->list_extra|@json_encode};
		</script>
	    {*html_table loop=$action_parameter->list_extra*}
	</td>
	{else}
		<td><input type="text" name="action_parameter" value="{$action_parameter->value}" /></td>
	{/if}
	
	<td colspan="1"><input type="button" id="action_button" value="הפעל" style="color:red"/></td>
	<td style="display:none;"><input type="text" id="actionDelayMSeconds"  value="{$report->actionDelayMSeconds}" /></td>
	</tr>
	</table> 
{/if}

{if $missing}
יש לבחור פרמרטים עבור הדוח
{elseif $parameters->interactive && !$interactive}
{else}
{*if $data}
<h4>{$data|@count} רשומות</h4>
{else}
<br />
{/if*}

{if isset($affected_rows)}
<h4>{$affected_rows} רשומות הושפעו</h4>
{else}
{include file="$tpl_name"}
{/if}
{/if}
{/if}
</body>
