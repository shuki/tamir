$.jset.fn.registerGridDefinition('dormitory', {
  	source: 'dormitory',
  	item_name: 'מסגרת',
	load_edit_record: false,
	//reopen_after_add: true,
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
	/*	$.jset.fn.disable_hide_field(formid, 'council_id');
		$.each($(formid).find('label.CaptionField'), function(i, elem){
			$(elem).html($(elem).html().replace(' 1', '').replace(' 2', ''));
		}); */
	},
	afterSubmit: function(response, postdata){
		$('table.jset_table[id="patient"]').jset('pending_reload');
		$('table.jset_table[id="worker"]').jset('pending_reload');
		$('table.jset_table[id="shift_summary"]').jset('pending_reload');
		$('table.jset_table[id="school"]').jset('pending_reload');
		return [true];
	},
    grid: {
	    sortname: 'name',
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
