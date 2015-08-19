$.jset.fn.registerGridDefinition('shift_summary', {
  	source: 'shift_summary',
  	item_name: 'סיכום משמרת',
	load_edit_record: false,
	reopen_after_add: true,
	spacing: '10px',
	template: {
		use: true,
		columns: 2
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
		$.jset.fn.append_fields_td(formid, 'creation_date', 2);
		$.jset.fn.append_fields_td(formid, 'date', 4);
	/*	$.jset.fn.disable_hide_field(formid, 'council_id');
		$.each($(formid).find('label.CaptionField'), function(i, elem){
			$(elem).html($(elem).html().replace(' 1', '').replace(' 2', ''));
		}); */
	},
	beforeShowForm: function(formid){
		fn_shift_summary.apply.call(this, formid);
	},
	afterclickPgButtons : function (whichbutton, formid, rowid){
		fn_shift_summary.apply.call(this, formid);
	},
	afterSubmit: function(response, postdata){
		//$('table[id="patient"]').jset('pending_reload');
		return [true];
	},
	afterSubmitError: function(response, postdata, frmoper, obj){
		var message = obj.error.message;
		switch(obj.error.info[1]){
			case 1062: 
				message = 'קיים כבר סיכום משמרת לבית בתאריך זה.';
				break;
			default:
				;
		}
		return [false, message];
	},
    grid: {
	    sortname: 'date',
	    sortorder: 'desc',
  	},
  	navigation:{
		options : {
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

var fn_shift_summary = {
	apply: function(formid){
		var grid = $(this);
		switch(user_attributes.group){
			case '3':
			case '4':
				var worker_attendants = $($.jset.fn.get_form_field(formid, 'worker_attendants')).val();
				var worker_attendants_array = worker_attendants.split(',');
				var flag = $($.jset.fn.get_form_field(formid, 'creator')).val() != user_attributes.id && worker_attendants_array.indexOf(user_attributes.id) == -1;
				$.jset.fn.readonlySet(grid, formid, flag);
				break;
			default:
				;
		}
	}
};
