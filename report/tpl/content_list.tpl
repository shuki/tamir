<style>
	span.field-title{
		font-size: 18px;
		font-weight:bold;
	}
	p.footer {
		page-break-after:always;
	}
</style>

{foreach from=$data key=k item=row}
{foreach from=$row key=k item=item}
<span class="field-title">{$k}:</span> {$item}<br />
{/foreach}
<p class="footer">
</p>
{/foreach}

