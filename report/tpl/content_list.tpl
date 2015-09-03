<style>
	span.field-title{
		font-size: 18px;
		font-weight:bold;
	}
	p.footer {
		page-break-after:always;
	}
</style>

<table class="data-list">
{if $jset_user_document_footer}
<tfoot>
    <tr>
        <!--td colspan="100"><img width="100%" src="../img/gai_footer.png"></td-->
        <td colspan="100"><img width="100%" src="../{$jset_user_document_footer}"></td>
    </tr>
</tfoot>
{/if}
<thead>
{if $jset_user_document_header}
	<tr class="heading">
		<!--th colspan="100"><img  height="105px" src="../img/adanim_header.png"></th-->
		<th colspan="100"><img  width="100%" src="../{$jset_user_document_header}"></th>
	</tr>
{/if}
	<tr class="heading">
		<th colspan="100" class="description">{$description}</th>
	</tr>
	<tr class="heading">
		<th colspan="100">
			{if $error}
			<div dir="ltr">
			<span style="color:red">Error in report</span><br />
			{$error}<br />
			{$error_msg}<br />
			{$error_dump}
			</div>
			{else}
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
			<tr>
				<td colspan=10"><input type="submit" value="הרץ דוח" /> <input type="submit" value="יצא לאקסל" name="export"/> <input type="button" value="הדפס" name="print"/></td>
			</tr>
			</table>
			</form>	
			
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
			{* include file="$tpl_name" *}
			{/if}
			{/if}
			{/if}
		</th>
	</tr>
<tr>
<td>

{foreach from=$data key=k item=row}
{foreach from=$row key=k item=item}
<span class="field-title">{$k}:</span> {$item}<br />
{/foreach}
<p class="footer">
</p>
{/foreach}

</td>
</tr>
</table>
