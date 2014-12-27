<table class="data">
<tr style="border: solid 1px black; border-collapse: collapse; padding: 4px;">

{assign var="column_number" value="1"}
{assign var="fulluri" value=$smarty.server.REQUEST_URI}
{if $fulluri|strpos:orderby}
	{assign var="fulluri" value=$fulluri|substr:0:(($fulluri|strpos:orderby)-1)}
{/if}
{foreach from=$data[0] key=k item=i}
	{if $report->breakOnColumn && $column_number == $report->breakOnColumn}
		{assign var="breakOnColumnName"  value=$k}
	{/if}
	{assign var="column_number" $column_number+1}
	
	<th style="border: solid 1px black; border-collapse: collapse; padding: 4px; background-color: #dddddd;"><!--a href="{$fulluri}&orderby=order by {$column_number-1}">^</a-->&nbsp; {$k} &nbsp;<!--a href="{$fulluri}&orderby=order by {$column_number-1} desc">v</a--></th> 
{foreachelse}
	<th colspan="100" style="border: solid 1px black; border-collapse: collapse; padding: 4px; background-color: #dddddd;">No Data</th>
{/foreach}
</tr>

{foreach from=$data key=k item=row}
{foreach from=$row key=k item=item}
{if isset($breakOnColumnName) && $breakOnColumnName == $k}
	{if !isset($breakOnValue)}
		{assign var="breakOnValue" value=$item}
	{else}
		{if $breakOnValue != $item}
			{assign var="breakOnValue" value=$item}
			{*assign var="breakOnMe" value="1"*}	
			<tr><td colspan="{$column_number}">------------------------------------------------------------------------------------------------------------------------------</td></tr>
		{/if}	
	{/if}
{/if}
{/foreach}

<tr>
{assign var="i" value=0}
{foreach from=$row key=k item=item}
{assign var="i" value=$i+1}
{if $report->actionSelectionColumn == $i}
	{if $item}
		<td><input type="checkbox" name="selections" value="{$item}" /></td>
	{else}
		<td></td>
	{/if}
{else}
	<td>{$item}</td>
{/if}
{/foreach}
</tr>	
{/foreach}


{if isset($aggregate)}
	<tr>
		{foreach from=$aggregate key=k item=row}
		{foreach from=$row key=k item=item}
			<td class="aggregate">{$item}</td>
		{/foreach}
		{/foreach}
	</tr>
{/if}

</table>
