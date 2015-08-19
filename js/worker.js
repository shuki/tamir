$.jset.fn.registerGridDefinition('worker', {
  	source: 'worker',
  	item_name: 'עובד',
	load_edit_record: false,
	reopen_after_add: true,
	spacing: '10px',
	template: {
		use: true,
		columns: 3
	},
	filterToolbar:{
		hide: false,
		navButtonAdd: false,
	},
	copy:{
		properties: {
			editCaption: 'העתק'
		},
		options: {
			title: 'העתק'
		}
	},
	help:{
		hide: false,
		navButtonAdd: true,
		dialog: {
			autoOpen: false,
			title: 'הסבר',
			width: 600,
			position: 'top'
		},
		options: {
			caption:'',
			title:'הסבר', 
			buttonicon :'ui-icon-lightbulb', 
			position: 'last'
		}
	},
	columnChooser:{
		navButtonAdd: true,
		options: {
			caption: '',
			title: 'בחר עמודות',
			buttonicon: 'ui-icon-calculator',
			position: 'last'
		},
		multiselect:{
		    locale: {
		        addAll: 'הצג את כל העמודות',
		        removeAll: 'הסתר את כל העמודות',
		        itemsCount: 'עמודות מוצגות'
		    }
		},
		col:{
		    width: 420,
		    modal: true,
		    msel_opts: {dividerLocation: 0.5},
		    dialog_opts: {
		        minWidth: 470,
		        minHeight: 370,
		        show: 'blind',
		        hide: 'explode'
		    }
		}
	},
	onInitializeForm: function(formid){
		$(formid).closest('.ui-jqdialog').offset({ top: -1});
		var button = $('<tr><td><button id="reset_password" class="CaptionField">אפס סיסמה</button></td></tr>');
		button.appendTo($.jset.fn.get_form_field(formid, 'group').closest('table'))
		.on('click', function(){
			var title = 'איפוס סיסמה';
			var message = '<div dir="rtl">האם ברצונך לאפס את הסיסמה?</div>';	
			$.jset.fn.confirm(title, message, function(){
				var params = {
					_method_: 'reset_password',
					id: $.jset.fn.get_form_field(formid, 'id').val()
				};
				
				$.jset.fn.hub('jset/server/hub.php', params, function(data){
					var message = (data == 0 || data == 1) ? '<div dir="rtl">סיסמה אופסה בהצלחה.</div>' : '<div dir="rtl">סיסמה לא אופסה.</div>';	
					$.jset.fn.alert(title, message);					
				});
			});
		});
	},
	beforeShowForm: function(formid){
		var grid = $(this);
		grid.data('form_action') == 'edit' ? $('button#reset_password').show() : $('button#reset_password').hide();
	},
	afterSubmit: function(response, postdata){
		$('table.jset_table[id="patient"]').jset('pending_reload');
		return [true];
	},
	afterSubmitError: function(response, postdata, frmoper, obj){
		var message = obj.error.message;
		switch(obj.error.info[1]){
			case 1062: 
				message = 'קיים כבר עובד עם שם משתמש זה.';
				break;
			default:
				;
		}
		return [false, message];
	},
    grid: {
	    sortname: 'first_name',
	    sortorder: 'asc',
  	},
  	navigation:{
		options : {
			add: user_attributes.group == 1,
			del: user_attributes.group == 1,
			search: true,
			view: false
		},
		edit:{
			checkOnUpdate:true
		},
		add:{
			checkOnUpdate:true,
			closeAfterAdd: false
		},
		del:{
		},
		search:{
		},
		view:{
		}
	}
});
