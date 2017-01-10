$(function(){
	var win;
	var fn = {
		setBackground : function(){
			$(this).closest('tr').css('background-color', $(this).val() ? 'white' : 'yellow');	
		},
		client_action: function(href){
				win = window.open(href, '_blank');
		},
		server_action: function(href){
				win = window.open(href, '_blank');
		},
		runAction: function(){
			var action_value = $("select[name='action_parameter']").val();
			var action_text = $("select[name='action_parameter']").find(":selected").text();
			var records = $("input[name='selections']:checked");
			var count = records.length;
			var delay = $('#actionDelayMSeconds').val();
			
			if(!confirm('האם ברצונך ל' + action_text + ' עבור ' + count + ' רשומות?'))
				return;
				
			records.each(function(index, element){
				//alert(index);
				var href = action_value;
				href = href.replace('$selection$', $(element).val());
				setTimeout(fn.client_action, delay * index, href);
				
				/*$.get(href, {async:false}, function(data){
					document.location = data;
					//alert(data);
				})*/
			});
			//alert($("select[name='action_parameter']").val());
		},
		runActionList: function(){
			var action_value = $("select[name='action_parameter']").val();
			var action_text = $("select[name='action_parameter']").find(":selected").text();
			var action_index = $("select[name='action_parameter']").find(":selected").index();
			alert(action_index);
			if(action_index > 0)
				alert(action_parameter_list_extra_array[action_index - 1]['SeparateCallForEachSelection']);
			var records = $("input[name='selections']:checked");
			var count = records.length;
			var delay = $('#actionDelayMSeconds').val();
			
			if(!confirm('האם ברצונך ל' + action_text + ' עבור ' + count + ' רשומות?'))
				return;
			
			var id_list = '';
			
			records.each(function(index, element){
				id_list += (id_list != '') ? '|~|' : '';
				id_list += $(element).val();
			});

			href = action_value.replace('$selection$', id_list);
			fn.client_action(href);
		},
		autoRefresh: function(){
			if($('#autoRefreshSeconds').val() > 0)
			{
				setInterval(function(){
					location.reload();
				}, $('#autoRefreshSeconds').val() * 1000);
			}
		},
		print: function(){
			window.print();
		}
	};
	
	$('#action_button').bind('click', fn.runActionList);
	$('input[name="print"]').bind('click', fn.print);
	
	$('input:text').bind('keyup', fn.setBackground);
	$('select').bind('change', fn.setBackground);
	$('input:text').trigger('keyup');
	$('select').trigger('change');
	$("input[value='']:text:visible:first").focus();
	fn.autoRefresh();
});