<style>
	span.field-title{
		font-size: 18px;
		font-weight:bold;
	}
	p.footer {
		page-break-after:always;
	}
</style>

<table class="data">
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
</thead>
{foreach from=$data key=k item=row}
<tr><td>
{foreach from=$row key=k item=item}
<span class="field-title">{$k}:</span> {$item}<br />
{/foreach}
<p class="footer">
</p>
</td></tr>
{/foreach}
</table>
